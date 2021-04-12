//-------------------------Recuperer l'ID de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID = urlParams.get('_id');

//----------------- PARTIE 1 : AFFICHAGE PRODUIT SELECTIONNE -------------------------//

//---Requete pour recuperer les infos du nounours en fonction de l'ID
async function findNounoursWithID() { // Requete des objets Teddies
	await fetch("http://localhost:3000/api/teddies/" + ID)
		.then((response) => response.json())
		.then(dataServer => { nounours = dataServer; }) // Rempli l'array avec toutes les infos du serveur
		.catch(error => { console.error(error);})
};

//---Fonction pour afficher le produit sélectionné
async function displayNounours() {
	await findNounoursWithID();

	let colorsTeddy = '';
	for (let element of nounours.colors) {
		colorsTeddy += `<option value="${element}">${element}</option>`;
	}

	let select = '';
	select += `<label for="choixCouleurs">Couleurs disponibles :</label><br/>
               <select name="choixCouleurs" id="choixCouleurs">${colorsTeddy}</select>`;

	document.getElementById('customClient').innerHTML = select;
	document.getElementById('imageCustom').innerHTML = `<img src="${nounours.imageUrl}" class="img-fluid" />`;
	document.getElementById('descriptionCustom').innerHTML = nounours.description;
	document.getElementById('nameCustom').innerHTML = nounours.name;
	document.getElementById('priceCustom').innerHTML = (nounours.price / 100).toFixed(2) + ' EUR';
}

//---------------Lancement de la fonction au chargement de la page----------------//

displayNounours();


//----------------- PARTIE 2 : ENVOI DE LA SELECTION AU PANIER  -------------------------//
	//----------------------------------Interaction client---------------------------//

//---Mise a jour du total

var inputQuantite = document.getElementById('qteInput');
var priceTotal = document.getElementById('priceCustom');

inputQuantite.addEventListener('change', function (event) {
	let total = event.target.value * nounours.price/100;
	priceTotal.innerHTML = total.toFixed(2) +' EUR';
});

var sendOrderNew =[];

//---Ajout du Produit au panier
var addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click',async function (event) {
	event.preventDefault();
	let qte = inputQuantite.value;
	let orderInCart = [];
	let obj = {};
	if (qte.match(/[0-9]/) && qte > 0 && qte < 11) { //eviter une commande forcée à 0 unité
		
		let selectElmt = document.getElementById('choixCouleurs'); // selectionne le choix de la couleur
		let customSelect = selectElmt.options[selectElmt.selectedIndex].value; // selectionne la quantite

		let reqOrderExist =[];
		let newEntries = ""; 
		let newQuantity = 0;
		let checkColorExist = false;
		let checkColorIndex = 0;

		if (localStorage.getItem(ID)){ //Si le panier contient déjà un article du même ID

			reqOrderExist = JSON.parse(localStorage.getItem(ID)); //Charge l'array avec la dernireè entrée (BUG!!!!!!)
			let numberArray = JSON.parse(localStorage.getItem(ID)).length;

			orderInCart = reqOrderExist;// on récupère l'array avec toutes les commandes pour cet ID

		
				for (let i in reqOrderExist) {//On vérifie si une couleur existe déjà dans tout le Array
	
					if(reqOrderExist[i].colors == customSelect){ // Si une couleure existe alors on renvoie true avec l'index du array
						checkColorExist = true;
						checkColorIndex = i;
					}
				}
				if(checkColorExist === true){ // On modifie le champ de la couleur


					newQuantity = parseInt(qte) + parseInt(reqOrderExist[checkColorIndex].quantity);
				
					newEntries = {colors: reqOrderExist[checkColorIndex].colors, quantity : newQuantity}; //On modifie la commande existante

					orderInCart[checkColorIndex] = newEntries; 

					localStorage.setItem(ID, JSON.stringify(orderInCart)); //On envoie au panier
					
				}
				else{ // Si chekColor === false alors la couleur n'existe pas dans le array
					orderInCart.push({colors: customSelect, quantity : parseInt(qte)}); //On ajoute à l'array toutes les commandes
					localStorage.setItem(ID, JSON.stringify(orderInCart)); //On envoie au panier
				}			
			
		}
		else{
			orderInCart.push({colors: customSelect, quantity : parseInt(qte)}); //On ajoute à l'array toutes les commandes
			localStorage.setItem(ID, JSON.stringify(orderInCart)); //On envoie au panier
		}
		
	}
	else {
		alert('Veuillez sélectionner au moins 1 unite !');//Message d'erreur si on force une commande à 0
    }
});


//-------------------------Recuperer l'ID de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const ID = urlParams.get('_id');

//-------------------------Déclaration de l'array nounours
var nounours = [];

//-------------------------Déclaration des fonctions-------------------------//

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


//----------------------------------Interaction client---------------------------//

//---Mise a jour du total

var inputQuantite = document.getElementById('qteInput');
var priceTotal = document.getElementById('priceCustom');

inputQuantite.addEventListener('change', function (event) {
	let total = event.target.value * nounours.price/100;
	priceTotal.innerHTML = total.toFixed(2) +' EUR';
});


//---Ajout du Produit au panier
var addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click',async function (event) {
	event.preventDefault();
	let qte = inputQuantite.value;
	if (qte.match(/[0-9]/) && qte > 0 && qte < 11) { //eviter une commande forcée à 0 unité

		let item = localStorage.length + 1;
		let selectElmt = document.getElementById('choixCouleurs'); // selectionne le choix de la couleur
		let customSelect = selectElmt.options[selectElmt.selectedIndex].value;

		let obj = { idOrder: item, _id: nounours._id, name: nounours.name, imageUrl: nounours.imageUrl, price: nounours.price, qte: inputQuantite.value, color: customSelect };
		localStorage.setItem(item, JSON.stringify(obj));
	}
	else {
		alert('Veuillez sélectionner au moins 1 unite !');//Message d'erreur si on force une commande à 0
    }
});


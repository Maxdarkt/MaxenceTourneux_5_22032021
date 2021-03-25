//-------------------------Récupérer l'ID de l'URL
function $_GET(param) {
	var vars = [];
	window.location.href.replace(location.hash, '').replace(
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function (m, key, value) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if (param) {
		return vars[param] ? vars[param] : null;
	}
	return vars;
}

var ID = $_GET();
console.log(ID._id);

var nounours = [];

async function fillProductsID() { // Requete des objets Teddies
	await fetch("http://localhost:3000/api/teddies/" + ID._id)
		.then((response) => response.json())
		.then(_data => { nounours = _data; }) // Rempli l'array avec toutes les infos du serveur
		.catch(error => { console.error(error);})
};


async function displayNounours() {
	await fillProductsID();
	console.log(nounours.colors);

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

displayNounours();


//Interaction client

//--------------------------Mise a jour du total-----------------------------------

var inputQuantite = document.getElementById('priceInput');
var priceTotal = document.getElementById('priceCustom');

console.log(document.getElementById('priceInput'));

inputQuantite.addEventListener('change', function (event) {
	let total = event.target.value * nounours.price/100;
	priceTotal.innerHTML = total.toFixed(2) +' EUR';
});


//Test LocalStorage
var addToCart = document.getElementById('addToCart');

addToCart.addEventListener('click',async function (event) {
	event.preventDefault();
	let item = localStorage.length + 1;
	let selectElmt = document.getElementById('choixCouleurs');
	let customSelect = selectElmt.options[selectElmt.selectedIndex].value;

	let obj = { idOrder: item, _id: nounours._id, name: nounours.name, imageUrl: nounours.imageUrl, price: nounours.price, qte: inputQuantite.value, color: customSelect };
	localStorage.setItem(item, JSON.stringify(obj));

	console.log(item);
});


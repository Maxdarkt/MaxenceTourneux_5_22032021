//---------------------Debug en manuelle si besoin--------------------//

//localStorage.clear(); //Vide le panier manuellement 

//--------------------- Declarations des variables --------------------//
const nounourses = [];
var priceNounoursTo100 = "";
var priceNounoursLess50 = "";
var priceNounoursMLess20 = "";

var totalPrice = 0;

//--------------------- Declarations des fonctions | --------------------//

function addTenToAge(age) { // Ajoute 10 à l'age envoyé en argument
    return age + 10;
}

function displayColorsAvailable(name, colors) {//Afficher les couleurs disponibles en fonction du nom envoyes
    for (let element of colors) {
        //console.log(element);
    }
    if (colors.length < 3) {
        //console.log(name +" ne possede pas de troisieme couleur");
    }
}

function displayNameTeddies(array) {//afficher le nom des nounours
    for (let i = 0; i < array.length; i++) {
        displayColorsAvailable(array[i].name, array[i].colors) 
    }
}

function displayTotalPrice(array) {//Calculer le prix total || 100 %
    for (let i = 0; i < array.length; i++) {
        totalPrice += array[i].price;
        return totalPrice;
    }
}

function displayHalfPrice(array) {//Afficher le prix de chaque teddy
    for (let i = 0; i < array.length; i++) {
        priceNounoursTo100 = "Le prix de " + array[i].name + " est a " + array[i].price;
        priceNounoursLess50 = "Le prix de " + array[i].name + " a -20% est a " + array[i].price * 0.8;
        priceNounoursMLess20 = "Le prix de " + array[i].name + " a -50% est a " + array[i].price * 0.5;
    }
}

function fillArrayNounourses(array) { // on recupere toutes les infos du serveur sous forme d'array dans la const nournourses []
    for (let element of array) {
       nounourses.push(element)    
    }
    displayNameTeddies(nounourses);
    displayTotalPrice(nounourses);
    displayHalfPrice(nounourses);
};

//--------------------- Requete pour recuperer les informations des Teddies --------------------//

async function productRequest() { // Requete des objets Teddies
    await fetch('http://localhost:3000/api/teddies')
        .then((response) => response.json())
        .then((nounours) => fillArrayNounourses(nounours)) // On remplit l'array avec toutes les infos du serveur
};

//--------------------Modif DOM-----------------------------------------//

var cartPrev = document.getElementsByClassName('cart-prev');

async function displayListProducts() {
    await productRequest();

    let listOfProducts = '';

    nounourses.forEach(nounourses =>
        listOfProducts += `<div class="mb-3 bg-light">
                                <div class="row h-100">
                                        <div class="col-6 d-flex justify-content-center align-items-center">
                                            <img src=${nounourses.imageUrl} class="img-fluid" />
                                        </div>
                                        <div class="col-6 d-flex flex-column justify-content-around align-items-center">
                                            <p class="text-justify">${nounourses.description}</p>
                                            <p class="text-wrap"><strong>Couleurs disponibles :</strong><br/>${nounourses.colors}</p>
                                            <a href="./personnalisation.html?_id=${nounourses._id}" class="btn btn-dark font-weight-bold" role="button">Voir Produit</a>
                                        </div>
                                </div>
                                <div class= "row h-100">
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <p><strong>${nounourses.name}</strong></p>
                                        </div>
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <p><strong>${(nounourses.price / 100).toFixed(2)} EUR
                                            </strong></p>
                                        </div>
                                </div >
                        </div>`)
    document.getElementById('cart-prev').innerHTML = listOfProducts;

}

//-------------------Lancement de la fonction au chargement de la page -------------------------------//

displayListProducts();



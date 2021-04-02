//--------------------- Declarations des variables --------------------//
var nounours = [];
const nounourses = [];

var priceNounoursTo100 = "";
var priceNounoursLess50 = "";
var priceNounoursMLess20 = "";

var totalPrice = 0;

//------------Verification panier plein ou vide pour aller sur la page panier

var goToCart = document.getElementById('cart-Display');

goToCart.addEventListener('click', function (event) {
    event.preventDefault();
    if (localStorage.length == 0) {
        alert('Le panier est vide');
    }
    else {
        document.location.href = "./panier.html";
    }
});

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

//--------------------- Requete pour recuperer les informations des Teddies --------------------//

async function productRequest() { // Requete des objets Teddies
    await fetch('http://localhost:3000/api/teddies')
        .then((response) => response.json())
        .then((nounours) => fillArrayNounourses(nounours)) // On remplit l'array avec toutes les infos du serveur
};

//--------------------------Fonction générale-----------------------------------
function fillArrayNounourses(array) { // on recupere toutes les infos du serveur sous forme d'array dans la const nournourses []
    for (let element of array) {
       nounourses.push(element)    
    }
    displayNameTeddies(nounourses);
    displayTotalPrice(nounourses);
    displayHalfPrice(nounourses);
};

function displayHalfPrice(array) {//Afficher le prix de chaque teddy
    for (let i = 0; i < array.length; i++) {
        priceNounoursTo100 = "Le prix de " + array[i].name + " est a " + array[i].price;
        priceNounoursLess50 = "Le prix de " + array[i].name + " a -20% est a " + array[i].price * 0.8;
        priceNounoursMLess20 = "Le prix de " + array[i].name + " a -50% est a " + array[i].price * 0.5;
    }
}
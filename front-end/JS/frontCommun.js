//--------------------- Declarations des variables --------------------//
var nounours = []; //array spécifique contenant les informations d'un Teddy en particulier (ID)
const nounourses = []; //array général contenant tous les teddies => Page d'accueil

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
};

//---------------------------Redirection URL sir le panier est vide -------------------------------------------
function checkCart(url){
    if (localStorage.length == 0) {
        document.location.href = url;
    }
}

//--------------------- D�clarations des variables --------------------//

const nounourses = [];
var prixTotal = 0;
var alertNumberColors = true;

//--------------------- D�clarations des fonctions | --------------------//

function addTenToAge(age) {
    return age + 10;
}

function afficherColorsisDisponibles(name, colors) {//Afficher les couleurs disponibles en fonction du nom envoy�
    for (let element of colors) {
        console.log(element);
    }
    if (colors.length < 3) {
        alertNumberColors = false;
        console.log(name +" ne possede pas de troisieme couleur");
    }
}

function afficherNomDesNounours(array) {//afficher le nom des nounours
    for (let i = 0; i < array.length; i++) {
        console.log(array[i].name);
        afficherColorsisDisponibles(array[i].name, array[i].colors)
    }
}

function afficherPrixTotal(array) {//Calculer le prix total || 100 %
    for (let i = 0; i < array.length; i++) {
        prixTotal += array[i].price;
    }
    console.log(prixTotal);
}

function afficherMoitierPrix(array) {//Afficher le prix de chaque teddy
    for (let i = 0; i < array.length; i++) {
        console.log("Le prix de " + array[i].name + " est a " + array[i].price);// Prix � 100 %
        console.log("Le prix de " + array[i].name + " a -20% est a " + array[i].price * 0.8);// Prix � -20 %
        console.log("Le prix de " + array[i].name + " a -50% est a " + array[i].price * 0.5);// Prix � -50 %
    }
}



function fillListProducts(array) { // on r�cup�re toutes les infos du serveur sous forme d'array dans la const nournourses []
    for (let element of array) {
       nounourses.push(element)    
    }
    console.log(nounourses);
    afficherNomDesNounours(nounourses);
    afficherPrixTotal(nounourses);
    afficherMoitierPrix(nounourses);

};

//--------------------- Requete pour r�cup�rer kes informations des Teddies --------------------//

async function fillProducts() { // Requete des objets Teddies
    await fetch('http://localhost:3000/api/teddies')
        .then((response) => response.json())
        .then((nounours) => fillListProducts(nounours)) // Rempli l'array avec toutes les infos du serveur
};


//-------------------Lancement fonction -------------------------------//




//--------------------Modif DOM-----------------------------------------//

var cartPrev = document.getElementsByClassName('cart-prev');

//if (nounourses.lenght) {}

async function presentationProduit() {
    await fillProducts();
    console.log(nounourses.length);

    let listOfProducts = '';

    nounourses.forEach(nounourses =>
        listOfProducts += `<div class="row border border-primary">
                                        <div class="col-4 border">
                                        <img src=${nounourses.imageUrl} class="img-fluid align-middle" />
                                        </div>
                                        <div class="col-2 border">
                                        <p class="align-middle text-center">${nounourses.name}</p>
                                        </div>
                                        <div class="col-2 border">
                                        <p>${nounourses.colors}</p>
                                        </div>
                                        <div class="col-2 border">
                                        <p>${nounourses.description}</p>
                                        </div>
                                        <div class="col-2 border">
                                        <p>${nounourses.price}</p>
                                        </div>
                                </div>`)
    document.getElementById('cart-prev').innerHTML = listOfProducts;

}

presentationProduit();
//---------Verif panier + Empecher de rafraichir la page
urlRedirection = "./index.html";
checkCart(urlRedirection);

//------------------------Récupérer l'ID de la commande
//-------------------------Recuperer l'ID de l'URL
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const numOrder = urlParams.get('_id');
//---------------------Remerciements-------------

//POrtabilité des variables

//Poratbilité des variables
let formName = "";
let formLastName = "";
let formEmail = "";
let formEmailConf = "";
let formTel = 0;

let formRue = "";
let formCompl = "" ;
let formPostal = 0;
let formVille = "";

function fillInformationsCustomer (numOrder){ //On renseigne les variables avec les données du localStorage
    let dataOrder = JSON.parse(localStorage.getItem(numOrder));

    formName = dataOrder.name;
    formLastName = dataOrder.lastname;
    formEmail = dataOrder.email;
    formTel = dataOrder.tel;

    formRue = dataOrder.rue;
    formCompl = dataOrder.compl;
    formPostal = dataOrder.postal;
    formVille = dataOrder.ville;
}

function fillInformationsOrder (){ //Récupérer les produits validés dans le localStorage

document.getElementById('num-order').innerHTML = `<strong>${formName}</strong>, nous vous remercions pour votre confiance !<br/>
La commande n° ${numOrder} est bien en cours de préparation...`;

document.getElementById('livraison-prev').innerHTML = `<strong>La livraison arrivera à l'adresse suivante :</strong><br/>${formLastName} ${formName}<br/>${formRue}<br/>${formCompl}<br/>${formPostal}<br/>
${formVille}`;

}
//---déclaration svariables à trier avec front panier et uniformiser sur commun
var panierHTML = "";
var orderCart = [];
var sumCart = 0;
var indexArray = 0;

async function displayProductsOrder(){
    await productRequest(); //Renvoie la requete de toutes les infos des produits dans la BBD dans nounourses

        for (let i in nounourses){ //parcourt chaque array de la BDD et renvoie les valeurs dans éléments
            //console.log(nounourses[i]);
            if(localStorage.getItem(nounourses[i]._id)){ //On vérifie l'existance de commandes pour chaque produit de la BDD
                indexArray = 0;
                orderCart = JSON.parse(localStorage.getItem(nounourses[i]._id)); // On récupère le localStorage en fonction de l'ID

                for (let element of orderCart) {//object.keys(localStorage) => element = ID
                    
                    panierHTML += `<div class="row bg-light h-100 py-3">
                                            <div class="col-3 d-flex justify-content-center align-items-center">
                                                <img src="${nounourses[i].imageUrl}" class="img-fluid"/>
                                            </div>
                                            <div class="col-6">
                                                <p>${nounourses[i].name}</p>
                                                <p>${element.colors}</p>
                                                <p>Quantite : ${element.quantity}</p>
                                            </div>
                                            <div class="col-3 d-flex justify-content-center align-items-center">
                                                <p>${(nounourses[i].price / 100).toFixed(2) + ' EUR'}</p>
                                            </div>
                                        </div>
                                        <div class="border-bottom my-2 w-75"></div>`;
                
                    sumCart += element.quantity * nounourses[i].price / 100;
                    indexArray++;
                }
                    
                    document.getElementById('conf-prev').innerHTML = panierHTML;
                    document.getElementById('conf-sum').innerHTML = '<strong>' + sumCart.toFixed(2) + ' EUR </strong>';
            }
        }
}

function displayOrderConfirmation () {// Afficher la page et appel des différentes fonctions
    fillInformationsCustomer (numOrder);
    fillInformationsOrder ();
    displayProductsOrder();
}

displayOrderConfirmation ()

//on vide le panier
setTimeout(function() {
    localStorage.clear();
}, 2500);


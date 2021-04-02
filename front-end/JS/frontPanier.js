//-------------------VERIFICATION PANIER----------------------

var panierHTML = "";
var orderCart = [];
var sumCart = 0;
var j = 0;
var indexArray = 0;

async function displayCart(){
    await productRequest(); //Renvoie la requete de toutes les infos des produits dans la BBD dans nounourses

        for (let i in nounourses){ //parcourt chaque array de la BDD et renvoie les valeurs dans éléments
            //console.log(nounourses[i]);
            if(localStorage.getItem(nounourses[i]._id)){ //On vérifie l'existance de commandes pour chaque produit de la BDD
                indexArray = 0;
                orderCart = JSON.parse(localStorage.getItem(nounourses[i]._id)); // On récupère le localStorage en fonction de l'ID

                for (let element of orderCart) {//object.keys(localStorage) => element = ID
                    
                    panierHTML += ` <div class="row bg-light h-100 py-3">
                                            <div class="col-3 d-flex justify-content-center align-items-center">
                                                <img src="${nounourses[i].imageUrl}" class="img-fluid"/>
                                            </div>
                                            <div class="col-6">
                                                <p>${nounourses[i].name}</p>
                                                <p>${element.colors}</p>
                                                <label for="qteCart${j}">Quantite :</label><input onChange="majCart('${j}','${indexArray}','${nounourses[i]._id}','${element.colors}','${nounourses[i].price/100}')" id="qteCart${j}" value="${element.quantity}" type="number" min="1" max="10" />
                                            </div>
                                            <div class="col-3">
                                                <p id="price${j}">${(nounourses[i].price / 100).toFixed(2) + ' EUR'}</p>
                                                <a href="#" class="btn btn-dark font-weight-bold " role="button" onClick="removeToCart('${j}','${indexArray}','${nounourses[i]._id}','${element.colors}')">Supprimer</a>
                                            </div>
                                        </div>
                                        <div class="border-bottom my-2 w-75"></div>`;
                
                    sumCart += element.quantity * nounourses[i].price / 100;
                    j++;
                    indexArray++;
                }
                    
                    document.getElementById('panier-List').innerHTML = panierHTML;
                    document.getElementById('panier-Sum').innerHTML = sumCart.toFixed(2) + ' EUR ';
            }
        }
}

 


displayCart();




//-----------------D�claration requ�te

function majCart(j, indexArray, ID, color, price) {//Mise a jour du panier : localStorage + appel de la fonction MAJ du montant
    let response = JSON.parse(localStorage.getItem(ID));
    let newQte = document.getElementById(`qteCart${j}`).value;

    let difference = (newQte - response[indexArray].quantity) * price;

    majSum(difference);
    response[indexArray] = {colors : color, quantity: newQte};
    localStorage.setItem(ID, JSON.stringify(response));
}

function majSum(diff) {//Mise a jour du montant de commande

    sumCart += diff;
    document.getElementById('panier-Sum').innerHTML = sumCart.toFixed(2) + ' EUR ';


};

function checkLocalStorage(){//vérifier le panier pour des sredirections de page
    if (localStorage.length == 0) {
        document.location.href = "./index.html";
    }
    else {
        document.location.href = "./panier.html";
    }
};

function removeToCart(j, indexArray, ID, color) {//Supprimer un produit du panier
    let ordersLocal = JSON.parse(localStorage.getItem(ID));

    if(ordersLocal.length == 1){//si localStorage contient 1 seule entrée

        localStorage.removeItem(ID); //on supprime le localStorage complètement
        console.log(`l'entrée suivante ${ID} a été supprimée`)

        checkLocalStorage();
    }
    else if(ordersLocal.length > 1){//si localStorage contient plusieurs entrées
        let newOrderAfterDeleteOne = [];
        for (let element of Object.keys(ordersLocal)){//On récupère l'index pour comparer :
                //console.log(element == indexArray);

            if (element != indexArray){ //On boucle tous les indices sauf celui à supprimer

                newOrderAfterDeleteOne.push(ordersLocal[element]);//on créé un nouvel array provisoire
            }
        }
        console.log(newOrderAfterDeleteOne);
        localStorage.setItem(ID, JSON.stringify(newOrderAfterDeleteOne));//on remet à jour le localStorage en ayant supprimé l'indice sélectionné

        document.location.href = "./panier.html";//On recharge la page
    }
    else{
        console.error('erreure');
    }

}

//----------------Vider panier----------------------------

var clearCart = document.getElementById('clear-Cart');

clearCart.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    document.location.href = "./index.html";
});

//--------------Validation de la commande-----------------

function validateCart(event) {
    event.preventDefault();
    let formName = document.getElementById('form-Name').value;
    let formLastName = document.getElementById('form-Lastname').value;
    let formEmail = document.getElementById('form-Email').value;
    let formEmailConf = document.getElementById('form-EmailConf').value;
    let formTel = document.getElementById('form-Tel').value;

    let formRue = document.getElementById('form-Rue').value;
    let formCompl = document.getElementById('form-Compl').value;
    let formPostal = document.getElementById('form-Postal').value;
    let formVille = document.getElementById('form-Ville').value;

    let regexNom = /^[a-zA-z]{2,20}$/;
    let regexEmail = /[\w.-]+@[\w-]+\.\w{3,6}/;
    let regexTel = /^[0-9]{10}$/;
    let regexText = /[0-9a-zA-Z ����'��-]{5,50}$/;
    let regexPostal = /^[0-9]{5}$/g;


   // console.log(regexPostal.test(formPostal));

    if (regexNom.test(formName) && regexNom.test(formLastName) && regexEmail.test(formEmail)) {
        console.log('pseudo : OK');
    }
    else {
        console.log('pseudo : NO');
    }
};

/*
(   && regexTel.test(formTel) && regexText.test(formRue)
    && regexText.test(formCompl) && regexText.test(formVille) && regexPostal.test(formPostal)
*/
//-------------------VERIFICATION PANIER: pour éviter les bugs avec la touche précédente du navigateur
urlRedirection = "./index.html";
checkCart(urlRedirection);

//------------------Affichage du panier-----------------------
var panierHTML = "";
var orderCart = [];
var sumCart = 0;
var j = 0;
var indexArray = 0;

async function displayCart(){
    await productRequest(); //Renvoie la requete de toutes les infos des produits dans la BBD dans nounourses

        for (let i in nounourses){ //parcourt chaque array de la BDD et renvoie les valeurs dans éléments

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

        checkLocalStorage();
    }
    else if(ordersLocal.length > 1){//si localStorage contient plusieurs entrées
        let newOrderAfterDeleteOne = [];
        for (let element of Object.keys(ordersLocal)){//On récupère l'index pour comparer :

            if (element != indexArray){ //On boucle tous les indices sauf celui à supprimer

                newOrderAfterDeleteOne.push(ordersLocal[element]);//on créé un nouvel array provisoire
            }
        }
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

//--Vérification dui formulaire : REGEX
function checkForm(){
    formName = document.getElementById('form-Name').value;
    formLastName = document.getElementById('form-Lastname').value;
    formEmail = document.getElementById('form-Email').value;
    formEmailConf = document.getElementById('form-EmailConf').value;
    formTel = document.getElementById('form-Tel').value;

    formRue = document.getElementById('form-Rue').value;
    formCompl = document.getElementById('form-Compl').value;
    formPostal = document.getElementById('form-Postal').value;
    formVille = document.getElementById('form-Ville').value;

    let regexNom = /^[a-zA-z]{2,20}$/;
    let regexEmail = /[\w.-]+@[\w-]+\.\w{3,6}/;
    let regexTel = /^[0-9]{10}$/;
    let regexText = /[0-9a-zA-Z éèêàêôûùïî-]{5,50}$/;
    let regexVille = /[0-9a-zA-Z éèêàêôûùïî-]{2,50}$/;
    let regexCompl = /[0-9a-zA-Z éèêàêôûùïî-]{0,50}$/;
    let regexPostal = /^[0-9]{5}$/;

    if (regexNom.test(formName) && regexNom.test(formLastName) && regexEmail.test(formEmail) && regexTel.test(formTel) && regexText.test(formRue) && regexPostal.test(formPostal) && regexCompl.test(formCompl) && regexVille.test(formVille)  ) {

        if(formEmail === formEmailConf){

            return true;

        }else{
            alert(`l'adresse mail ne correspond pas !`);
            return false;
        }

    }
    else {
        alert(`Le formulaire présente une erreure !`);
        return false;
    }
}

function validateCart(event) {
    event.preventDefault();

    let checkFormVar = checkForm();

    if (checkFormVar) {//Si la fonction a renvoyé = true
        //création d'un objet
        let customerDetails = {name : formName, lastname : formLastName, email : formEmail, tel : formTel, rue : formRue, compl : formCompl, postal : formPostal, ville : formVille};

        let idOrder = Date.now();//création d'un id de commande unique

        localStorage.setItem(idOrder, JSON.stringify(customerDetails));//envoie au local Storage

        document.location.href = "./commande.html?_id=" +idOrder ;
    }
    
};
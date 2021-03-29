
//-------------------VERIFICATION PANIER----------------------

console.log(localStorage.length);

var panierHTML = "";
var orderCart = [];
var sumCart = 0;

for (let i = 1; i < localStorage.length+1; i++) {

    
    orderCart = JSON.parse(localStorage.getItem(i));
    
    console.log(orderCart);

        panierHTML += `  <div class="row border border-primary h-100">
                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <img src="${orderCart.imageUrl}" class="img-fluid"/>
                        </div>
                        <div class="col-6">
                            <p>${orderCart.name}</p>
                            <p>${orderCart.color}</p>
                            <label for="qteCart${i}">Quantite :</label><input onChange="majCart('${i}','${orderCart._id}')" id="qteCart${i}" value="${orderCart.qte}" type="number" min="1" max="10" />
                        </div>
                        <div class="col-3">
                            <p id="price${i}">${(orderCart.price / 100).toFixed(2) + ' EUR'}</p>
                            <a href="#" class="btn btn-dark font-weight-bold " role="button" onClick="removeToCart(${i})">Supprimer</a>
                        </div>
                    </div>`;

    sumCart += orderCart.qte * orderCart.price / 100;
 
}

document.getElementById('panier-List').innerHTML = panierHTML;
document.getElementById('panier-Sum').innerHTML = sumCart.toFixed(2) + ' EUR ';


//-----------------D�claration requ�te

function majCart(order,ID) {
    let response = JSON.parse(localStorage.getItem(order));
    let newQte = document.getElementById(`qteCart${order}`).value;


    let difference = (newQte - response.qte) * (response.price / 100);
    majSum(difference);

    localStorage.removeItem(order);
    let obj = { idOrder: order, _id: response._id, name: response.name, imageUrl: response.imageUrl, price: response.price, qte: newQte, color: response.color };
    localStorage.setItem(order, JSON.stringify(obj));
}

function majSum(diff) {
    console.log(sumCart);
    sumCart += diff;
    document.getElementById('panier-Sum').innerHTML = sumCart.toFixed(2) + ' EUR ';
    console.log(diff);
    console.log(sumCart);

};

function removeToCart(order) {
    localStorage.removeItem(order);
    if (localStorage.length == 0) {
        document.location.href = "./index.html";
    }
    else {
        document.location.href = "./panier.html";
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
//-------------------VERIFICATION PANIER----------------------

console.log(localStorage.length);

var panierHTML = "";
var orderCart = [];
var sumCart = 0;

for (let i = 1; i < localStorage.length+1; i++) {


    orderCart = JSON.parse(localStorage.getItem(i));

        panierHTML += `  <div class="row border border-primary h-100">
                        <div class="col-3 d-flex justify-content-center align-items-center">
                            <img src="${orderCart.imageUrl}" class="img-fluid"/>
                        </div>
                        <div class="col-6">
                            <p>${orderCart.name}</p>
                            <p>${orderCart.color}</p>
                            <label for="qteCart${i}">Quantite :</label><input id="qteCart${i}" placeholder="${orderCart.qte}" type="number" min="1" max="10" />
                        </div>
                        <div class="col-3">
                            <p id="price${i}">${(orderCart.price / 100).toFixed(2) + ' EUR'}</p>
                        </div>
                    </div>`;

    sumCart += orderCart.qte * orderCart.price / 100;
 
}

document.getElementById('panier-List').innerHTML = panierHTML;
document.getElementById('panier-Sum').innerHTML = sumCart.toFixed(2) + ' EUR ';


function majSum() {

};



//----------------Vider panier----------------------------

var clearCart = document.getElementById('clear-Cart');

clearCart.addEventListener('click', function (event) {
    event.preventDefault();
    localStorage.clear();
    document.location.href = "./index.html";
});


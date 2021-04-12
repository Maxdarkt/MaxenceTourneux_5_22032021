//--------------------Affichage des Teddies || Modification du DOM-----------------------------------------//
var cartPrev = document.getElementsByClassName('cart-prev');

async function displayListProducts() {
    await productRequest(); //Requete API

    let listOfProducts = '';
    
    for (let nounours of nounourses){ //On déroule tout l'array pour placer les variables dans le HTML
        let colorsString = '';
        for (let color of nounours.colors){//Split l'array pour que les couleurs reviennent à la  ligne en responsive
            if(nounours.colors.length>1){
                colorsString += color +', '; //Si plusieurs couleurs, on ajoute un espace après la , => ex : "black, white, brown, ..."
            }
            else {
                colorsString = color;
            }
        }

        listOfProducts += `<div class="mb-3 bg-light height-row-index pt-3">
                                <div class="row h-100">
                                        <div class="col-6 d-flex justify-content-center align-items-center">
                                            <img src=${nounours.imageUrl} class="img-fluid" />
                                        </div>
                                        <div class="col-6 d-flex flex-column justify-content-around align-items-center">
                                            <p class="text-justify">${nounours.description}</p>
                                            <p class="text-wrap"><strong>Couleurs disponibles :</strong><br/>${colorsString}</p>
                                            <a href="./personnalisation.html?_id=${nounours._id}" class="btn btn-dark font-weight-bold" role="button">Voir Produit</a>
                                        </div>
                                </div>
                                <div class= "row h-100">
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <p><strong>${nounours.name}</strong></p>
                                        </div>
                                        <div class="col d-flex justify-content-center align-items-center">
                                            <p><strong>${(nounours.price / 100).toFixed(2)} EUR
                                            </strong></p>
                                        </div>
                                </div >
                        </div>`;
    }
    document.getElementById('cart-prev').innerHTML = listOfProducts;
}

//-------------------Lancement de la fonction au chargement de la page -------------------------------//

displayListProducts();



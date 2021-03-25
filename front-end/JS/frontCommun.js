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
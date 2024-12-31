document.addEventListener("DOMContentLoaded", function () {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    let productsFromStorage = JSON.parse(localStorage.getItem("products"));
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};

    if (!productsFromStorage) {
        const defaultProducts = [
            { name: "Valentino Donna", price: 100, category: "Woody Perfumes", imageUrl: "images/download77 (3).jpeg" },
            { name: "Bombshell Eau de parfum", price: 150, category: "Fresh Perfumes", imageUrl: "images/VICTORIA SECRET bombshell seduction eau de parfum.jpeg" },
            { name: "Hugo Boss Femme", price: 200, category: "Fruity Perfumes", imageUrl: "images/Fragrance _ BOSS Femme Eau De Parfum _ Hugo Boss.jpeg" },
            { name: "La Rive", price: 250, category: "Evening Perfumes", imageUrl: "images/La Rive La Rive 315 Prestige Pink Eau De Parfum 100ml Para Feminino.jpeg" },
            { name: "Kayali Vanilla", price: 220, category: "Oriental Perfumes", imageUrl: "images/LEAH KATE AUROMA PERFUME.jpeg" },
            { name: "Victoria's Secret Tease", price: 210, category: "Citrus Perfumes", imageUrl: "images/perfume♡˚₊‧ ୨୧ ‧₊˚ ♡.jpeg" },
            { name: "Versace Bright Crystal", price: 180, category: "Luxury Perfumes", imageUrl: "images/VERSACE Bright Crystal.jpeg" },
            { name: "Coach Eau De Parfum", price: 170, category: "Floral Perfumes", imageUrl: "images/Coach Floral 90ml Eau De Parfum Women.jpeg" },
            { name: "Rose Goldea Perfume", price: 180, category: "Winter Perfumes", imageUrl: "images/Bvlgari Rose Goldea 50 _ 90 Ml Eau De Parfum.jpeg" }
        ];
        localStorage.setItem("products", JSON.stringify(defaultProducts));
        productsFromStorage = defaultProducts;
    }

    renderCart();
    renderFavorites();
});

function toggleFavorite(productName) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    if (favorites[productName]) {
        delete favorites[productName];
    } else {
        favorites[productName] = true;
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
}

function renderFavorites() {
    const productsFromStorage = JSON.parse(localStorage.getItem("products")) || [];
    const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
    const favoritesContainer = document.getElementById("favorites-wrapper"); 
    favoritesContainer.innerHTML = "";

    const favoriteItems = productsFromStorage.filter(product => favorites[product.name]);
    if (favoriteItems.length > 0) {
        favoriteItems.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("swiper-slide"); 
            productElement.innerHTML = `
                <div class="card-item">
                    <img src="${product.imageUrl}" alt="${product.name}" />
                    <div class="details">
                        <h4>${product.name}</h4>
                        <p>Category: ${product.category}</p>
                        <button class="favorite-btn" onclick="toggleFavorite('${product.name}')">
                            <i class="fa fa-heart"></i>
                        </button>
                    </div>
                </div>
            `;
            favoritesContainer.appendChild(productElement);
        });
        new Swiper('.swiper-container', {
            loop: true,
            grabCursor: true,
            spaceBetween: 30,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                0: { slidesPerView: 1 },
                620: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    } else {
        const message = document.createElement("p");
        message.innerText = "No products in your favorites!";
        favoritesContainer.appendChild(message);
    }
}

  
///////////////////////////////////////

function toggleCartItem(productName) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productName]) {
        delete cart[productName];
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updateQuantity(productName, change) {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    if (cart[productName]) {
        const newQuantity = cart[productName].quantity + change;
        if (newQuantity > 0) {
            cart[productName].quantity = newQuantity;
        } else {
            delete cart[productName];
        }
    } else {
        cart[productName] = { quantity: 1 };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function updateTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const productsFromStorage = JSON.parse(localStorage.getItem("products")) || [];
    let total = 0;

    Object.keys(cart).forEach(productName => {
        const product = productsFromStorage.find(p => p.name === productName);
        if (product) {
            total += product.price * cart[productName].quantity;
        }
    });

    document.getElementById("total-price").innerText = `Total Price: $${total.toFixed(2)}`;
}

function renderCart() {
    const productsContainer = document.getElementById("products-container");
    const productsFromStorage = JSON.parse(localStorage.getItem("products")) || [];
    const cart = JSON.parse(localStorage.getItem("cart")) || {};
    const cartItems = productsFromStorage.filter(product => cart[product.name]);
    productsContainer.innerHTML = "";

    if (cartItems.length > 0) {
        cartItems.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("item1");
            productElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}" />
                <div class="details">
                    <h4>${product.name}</h4>
                    <p>Price: $${product.price}</p>
                    <p>Category: ${product.category}</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity('${product.name}', -1)">
                            <i class="fa-solid fa-minus"></i>
                        </button>
                        <span class="quantity">${cart[product.name]?.quantity || 1}</span>
                        <button class="quantity-btn" onclick="updateQuantity('${product.name}', 1)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                    </div>
                    <button class="remove-from-cart" onclick="toggleCartItem('${product.name}')">Remove</button>
                </div>
            `;
            productsContainer.appendChild(productElement);
        });
    } else {
        const message = document.createElement("p");
        message.innerText = "No products in your cart!";
        productsContainer.appendChild(message);
    }

    updateTotalPrice();
}

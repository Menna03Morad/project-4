document.addEventListener("DOMContentLoaded", function () {
    let user = localStorage.getItem("First-name");
    if (user) {
        document.getElementById("welcome-message").textContent = `WELCOME ${user}`;
    }
});


const favorites = JSON.parse(localStorage.getItem("favorites")) || {};

const toggleFavorite = (productName, heartIcon) => {
    if (favorites[productName]) {
        delete favorites[productName]; 
        heartIcon.style.color = "pink"; 
    } else {
        const product = products.find((p) => p.name === productName);
        if (product) {
            favorites[productName] = product; 
            heartIcon.style.color = "red"; 
        }
    }
    localStorage.setItem("favorites", JSON.stringify(favorites)); 
    renderFavorites(); 
};

const renderFavorites = () => {
    const favoritesContainer = document.getElementById("favorites-container");
    favoritesContainer.innerHTML = "";
    const favoriteProducts = Object.values(favorites);

    if (favoriteProducts.length > 0) {
        favoriteProducts.forEach((product) => {
            const favElement = document.createElement("div");
            favElement.innerHTML = `
                <img src="${product.imageUrl}" alt="${product.name}">
                <h4>${product.name}</h4>
               <p>Price: $${product.price}</p>
                <p>Category: ${product.category}</p>
            `;
            favoritesContainer.appendChild(favElement);
        });
    } else {
        favoritesContainer.innerHTML = "<p>No favorites yet!</p>";
    }
};

const products = [
    {
        name: "Valentino Donna",
        price: 100,
        category: "Woody Perfumes",
        imageUrl: "images/download77 (3).jpeg",
    },
    {
        name: "Bombshell Eau de parfum",
        price: 150,
        category: "Fresh Perfumes",
        imageUrl: "images/VICTORIA SECRET bombshell seduction eau de parfum.jpeg",
    },
    {
        name: "Hugo Boss Femme",
        price: 200,
        category: "Fruity Perfumes",
        imageUrl: "images/Fragrance _ BOSS Femme Eau De Parfum _ Hugo Boss.jpeg",
    },
    {
        name: "La Rive",
        price: 250,
        category: "Evening Perfumes",
        imageUrl: "images/La Rive La Rive 315 Prestige Pink Eau De Parfum 100ml Para Feminino.jpeg",
    },
    {
        name: "Kayali Vanilla",
        price: 220,
        category: "Oriental Perfumes",
        imageUrl: "images/LEAH KATE AUROMA PERFUME.jpeg",
    },
    {
        name: "Victoria's Secret Tease",
        price: 210,
        category: "Citrus Perfumes",
        imageUrl: "images/perfume♡˚₊‧ ୨୧ ‧₊˚ ♡.jpeg",
    },
    {
        name: "Versace Bright Crystal",
        price: 180,
        category: "Luxury Perfumes",
        imageUrl: "images/VERSACE Bright Crystal.jpeg",
    },
    {
        name: "Coach Eau De Parfum",
        price: 170,
        category: "Floral Perfumes",
        imageUrl: "images/Coach Floral 90ml Eau De Parfum Women.jpeg",
    },
    {
        name: "Rose Goldea Perfume",
        price: 180,
        category: "Winter Perfumes",
        imageUrl: "images/Bvlgari Rose Goldea 50 _ 90 Ml Eau De Parfum.jpeg",
    },
];

const cart = {};
const cartCount = document.getElementById("cart-count");
const cartItemsList = document.getElementById("cart-items");
const cartContainer = document.getElementById("cart-items-container");

const saveCartToLocalStorage = () => {
    localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : {};
};

const toggleCartItem = (productName, productPrice) => {
    if (cart[productName]) {
        delete cart[productName];
    } else {
        cart[productName] = { quantity: 1, price: productPrice };
    }
    saveCartToLocalStorage();
    return !!cart[productName];
};

const updateCart = () => {
    cartItemsList.innerHTML = "";
    let totalItems = 0;

    Object.entries(cart).forEach(([productName, details]) => {
        totalItems += details.quantity;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <span>${productName}</span>
            <div>
                <button class="decrease">
                    <i class="fa-solid fa-minus"></i>
                </button>
                <span>${details.quantity}</span>
                <button class="increase">
                    <i class="fa-solid fa-plus"></i>
                </button>
            </div>
        `;

        listItem.querySelector(".decrease").addEventListener("click", () => {
            if (details.quantity > 1) {
                cart[productName].quantity--;
            } else {
                delete cart[productName];
            }
            updateCart();
        });

        listItem.querySelector(".increase").addEventListener("click", () => {
            cart[productName].quantity++;
            updateCart();
        });

        cartItemsList.appendChild(listItem);
    });

    cartCount.textContent = totalItems;

    if (totalItems === 0) {
        cartContainer.style.display = "none";
    }
};

document.querySelector(".cart-info").addEventListener("click", () => {
    cartContainer.style.display = cartContainer.style.display === "none" ? "block" : "none";
});

const generateItems = () => {
    const parentItems = document.querySelector(".parent-items");
    const template = document.querySelector(".item-template");

    parentItems.innerHTML = "";

    products.forEach((product) => {
        const newItem = template.cloneNode(true);
        newItem.style.display = "block";
        newItem.classList.remove("item-template");

        const img = newItem.querySelector("img");
        const name = newItem.querySelector("h4");
        const price = newItem.querySelector("p:nth-child(2)");
        const category = newItem.querySelector("p:nth-child(3)");
        const cartButton = newItem.querySelector(".cart-btn");
        const heartIcon = newItem.querySelector(".fav-h");

        img.src = product.imageUrl;
        img.alt = product.name;
        name.textContent = `Name: ${product.name}`;
        price.textContent = `Price: $${product.price}`;
        category.textContent = `Category: ${product.category}`;

        heartIcon.addEventListener("click", () => {
            toggleFavorite(product.name, heartIcon);
        });

        cartButton.addEventListener("click", () => {
            if (toggleCartItem(product.name, product.price)) {
                cartButton.textContent = "Remove from cart";
                cartButton.style.backgroundColor = "red";
                cartButton.style.width = "150px";
            } else {
                cartButton.textContent = "Add to cart";
                cartButton.style.backgroundColor = "rgb(246, 90, 131)";
                cartButton.style.width = "100px";
            }
            updateCart();
        });

        parentItems.appendChild(newItem);
    });

    template.remove();
};

document.addEventListener("DOMContentLoaded", () => {
    Object.assign(cart, loadCartFromLocalStorage());
    updateCart();
    generateItems();
    renderFavorites(); 
});

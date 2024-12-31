document.getElementById("searchInput").addEventListener("input", function () {
    let searchOption = document.getElementById("searchOption").value.toLowerCase();
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let items = document.getElementsByClassName("item1");

    let hasVisibleItems = false;
    Array.from(items).forEach(item => {
        let name = item.querySelector("h4").innerText.toLowerCase();
        let category = item.querySelector("p:nth-child(3)").innerText.toLowerCase();

        if (
            (searchOption === "name" && name.includes(searchInput)) ||
            (searchOption === "category" && category.includes(searchInput))
        ) {
            item.style.display = "block";
            hasVisibleItems = true;
        } else {
            item.style.display = "none";
        }
    });
});
// /////////////////////////////////////////////////////////\
const products = [
    {
        name: "Valentino Donna",
        price: "100$",
        category: "Woody Perfumes",
        imageUrl: "images/download77 (3).jpeg"
    },
    {
        name: "Bombshell Eau de parfum",
        price: "150$",
        category: "Fresh Perfumes",
        imageUrl: "images/VICTORIA SECRET bombshell seduction eau de parfum.jpeg"
    },
    {
        name: "Hugo Boss Femme",
        price: "200$",
        category: "Fruity Perfumes",
        imageUrl: "images/Fragrance _ BOSS Femme Eau De Parfum _ Hugo Boss.jpeg"
    },
    {
        name: "La Rive",
        price: "250$",
        category: "Evening Perfumes",
        imageUrl: "images/La Rive La Rive 315 Prestige Pink Eau De Parfum 100ml Para Feminino.jpeg"
    },
    {
        name: "Kayali Vanilla",
        price: "220$",
        category: "Oriental Perfumes",
        imageUrl: "images/LEAH KATE AUROMA PERFUME.jpeg"
    },
    {
        name: "Victoria's Secret Tease",
        price: "210$",
        category: "Citrus Perfumes",
        imageUrl: "images/perfume♡˚₊‧ ୨୧ ‧₊˚ ♡.jpeg"
    },
    {
        name: "Versace Bright Crystal",
        price: "180$",
        category: "Luxury Perfumes",
        imageUrl: "images/VERSACE Bright Crystal.jpeg"
    },
    {
        name: "Coach Eau De Parfum",
        price: "170$",
        category: "Floral Perfumes",
        imageUrl: "images/Coach Floral 90ml Eau De Parfum Women.jpeg"
    },
    {
        name: "Rose Goldea Perfume",
        price: "180$",
        category: "Winter Perfumes",
        imageUrl: "images/Bvlgari Rose Goldea 50 _ 90 Ml Eau De Parfum.jpeg"
    }
];
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

        img.src = product.imageUrl;
        img.alt = product.name;
        name.textContent = `Name: ${product.name}`;
        price.textContent = `Price : ${product.price}`;
        category.textContent = `Category : ${product.category}`;

        parentItems.appendChild(newItem);
    });
    template.remove();
};
generateItems();
document.getElementById("searchInput").addEventListener("input", function () {
    let searchOption = document.getElementById("searchOption").value.toLowerCase();
    let searchInput = document.getElementById("searchInput").value.toLowerCase();
    let items = document.querySelectorAll(".parent-items > .item1");

    items.forEach(item => {
        let name = item.querySelector("h4").innerText.toLowerCase();
        let category = item.querySelector("p:nth-child(3)").innerText.toLowerCase();

        if (
            (searchOption === "name" && name.includes(searchInput)) ||
            (searchOption === "category" && category.includes(searchInput))
        ) {
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
});
/////////////////////////////////////////////////////////////////////////
document.querySelector(".parent-items").addEventListener("click", function(e) {
    if (e.target.classList.contains("cart-btn")) {
        if (localStorage.getItem("First-name")) {
            window.location = "cartsproducts.html";
        } else {
            window.location = "login.html";
        }
    }
});
///////////////////////////////////////////////////////////////////
setTimeout(() => {
    let heart = document.querySelectorAll(".fav-h");
    heart.forEach(function(icon) {
        icon.addEventListener("click", function() {
            if (localStorage.getItem("First-name")) {
                window.location = "fav.html";
            } else {
                window.location = "login.html";
            }
        });
    });
}, 0);
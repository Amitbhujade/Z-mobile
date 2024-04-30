// const { disable } = require("express/lib/application");

//Navigation bar toggle section 

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    menu.classList.remove('active');
    signupForm.classList.remove('active');
    signupFormCancel.classList.remove('active');    
}

let shoppingCart = document.querySelector('.shopping-cart');

document.querySelector('#cart-btn').onclick = () => {
    shoppingCart.classList.toggle('active');
    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    menu.classList.remove('active');
    signupForm.classList.remove('active');
    signupFormCancel.classList.remove('active');
}

let loginForm = document.querySelector('.login-form');

document.querySelector('#user-btn').onclick = () => {
    loginForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menu.classList.remove('active');
    signupForm.classList.remove('active');
    signupFormCancel.classList.remove('active');
}

let signupForm = document.querySelector('.signup-form');

document.querySelector('#signup-btn').onclick = () => {
    signupForm.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menu.classList.remove('active');
    loginForm.classList.remove('active');
}

let signupFormCancel = document.querySelector('.signup-form');

document.querySelector('#cancel-btn').onclick = () => {
    signupFormCancel.classList.toggle('active');
    signupForm.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menu.classList.remove('active');
    loginForm.classList.remove('active');
}


let menu = document.querySelector('.nav');

document.querySelector('#menu-btn').onclick = () => {
    menu.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    signupFormCancel.classList.remove('active');
    signupForm.classList.remove('active');
}

window.onscroll = () => {
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    menu.classList.remove('active');
    signupFormCancel.classList.remove('active');
    signupForm.classList.remove('active');
}

//Filter module for product page

//Filter module for product page by brand name

filterSelection("all")
function filterSelection(c) {
    var x, i;
    x = document.getElementsByClassName("filterDiv");
    if (c == "all") c = "";
    for (i = 0; i < x.length; i++) {
        w3RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
    }
}

function w3AddClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) { element.className += " " + arr2[i]; }
    }
}

function w3RemoveClass(element, name) {
    var i, arr1, arr2;
    arr1 = element.className.split(" ");
    arr2 = name.split(" ");
    for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
            arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
    }
    element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btnContainer = document.getElementById("myBtnContainer");
var btns = btnContainer.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}


// Function to add a class
function addClass(element, name) {
    if (!element.classList.contains(name)) {
        element.classList.add(name);
    }
}

// Function to remove a class
function removeClass(element, name) {
    if (element.classList.contains(name)) {
        element.classList.remove(name);
    }
}


// Add event listener to the range slider
var slider = document.getElementById("myRange");
var sliderValue = document.getElementById("sliderValue");

slider.addEventListener("input", function () {
    sliderValue.textContent = this.value;
    var priceRange = parseInt(this.value);
    var products = document.getElementsByClassName("box");
    for (var i = 0; i < products.length; i++) {
        if (parseInt(products[i].dataset.price) <= priceRange) {
            addClass(products[i], "show");
        } else {
            removeClass(products[i], "show");
        }
    }
});

// Show all products by default when the page loads
window.onload = function () {
    filterSelection('all');
    sliderValue.textContent = slider.value;
};

//toggle for filter button
function toggleDiv() {
    var div = document.getElementById("myBtnContainer");
    if (div.style.display === "none" || div.style.display === "") {
        div.style.display = "block";
    } else {
        div.style.display = "none";
    }
}

//pagination for product page

document.addEventListener('DOMContentLoaded', function () {
    const content = document.querySelector('.products');
    const itemsPerPage = 12;
    let currentPage = 0;
    const items = Array.from(content.getElementsByClassName('box')).slice(0);

    function showPage(page) {
        const startIndex = page * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        items.forEach((item, index) => {
            item.classList.toggle('hidden', index < startIndex || index >= endIndex);
        });
        updateActiveButtonStates();
    }

    function createPageButtons() {
        const totalPages = Math.ceil(items.length / itemsPerPage);
        const paginationContainer = document.createElement('div');
        const paginationDiv = document.body.appendChild(paginationContainer);
        paginationContainer.classList.add('pagination');

        // Add page buttons
        for (let i = 0; i < totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i + 1;
            pageButton.addEventListener('click', () => {
                currentPage = i;
                showPage(currentPage);
                updateActiveButtonStates();
            });

            content.appendChild(paginationContainer);
            paginationDiv.appendChild(pageButton);
        }
    }

    function updateActiveButtonStates() {
        const pageButtons = document.querySelectorAll('.pagination button');
        pageButtons.forEach((button, index) => {
            if (index === currentPage) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

    }

    createPageButtons(); // Call this function to create the page buttons initially
    showPage(currentPage);
});


//TO show product description after clicking on the view more button
let description = document.querySelector('.product-div');

document.querySelector('#view-more').onclick = () => {
    description.classList.toggle('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menu.classList.remove('active');
    loginForm.classList.remove('active');
}

//cancel button for product desription page
let descriptionCancel = document.querySelector('.product-div');

document.querySelector('#cancel').onclick = () => {
    descriptionCancel.classList.toggle('active');
    description.classList.remove('active');
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    menu.classList.remove('active');
    loginForm.classList.remove('active');
}



// Check login state on page load
document.addEventListener('DOMContentLoaded', function () {
    var loggedIn = localStorage.getItem('loggedIn');

    // If user is logged in, enable adding products to the cart
    if (loggedIn === 'true') {
        var addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(function (button) {
            button.addEventListener('click', function (event) {
                event.preventDefault();
                var productName = button.getAttribute('data-product');
                var productPrice = parseFloat(button.getAttribute('data-price'));
                var productImage = button.getAttribute('data-image');
                addToCart(productName, productPrice, productImage);
                alert("Added to cart successfully");
            });
        });
    }
    // Load existing cart items and bill items if any
    loadCartItems();
    loadBillItems();
});

// Function to add product to cart
function addToCart(productName, productPrice, productImage) {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    var existingItem = cartItems.find(function (item) {
        return item.productName === productName;
    });

    if (existingItem) {
        // If the product already exists, increase the quantity
        existingItem.quantity++;
    } else {
        // Otherwise, add a new item to the cart
        cartItems.push({
            productName: productName,
            productPrice: productPrice,
            productImage: productImage,
            quantity: 1
        });
    }

    // Update local storage with the modified cart items
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Refresh cart items display
    loadCartItems();
    loadBillItems(); // Ensure bill items are updated too
}

// Function to load existing cart items
function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.querySelector('.cart-items');

    if (!cartItemsContainer) {
        console.error("Element '.cart-items' not found in the DOM.");
        return;
    }

    if (cartItems.length === 0) {
        cartItemsContainer.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    // Clear existing cart items
    cartItemsContainer.innerHTML = '';

    // Add each item to the cart
    cartItems.forEach(function (item) {
        var cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.productImage}">
            <div class="delete-btn fa fa-trash"></div>
            <div class="product-name" style="font-size:1.5rem">${item.productName}</div>
            <div class="product-price" style="font-size:1.5rem">Rs. ${item.productPrice.toFixed(2)}</div>
            <div class="quantity"><h5 style="font-size:1rem; display:inline">Quantity</h5>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" style="width:10rem">
            </div>
            <div class="product-subtotal" style="font-size: 1rem; margin:10px 0">Rs. ${(item.productPrice * item.quantity).toFixed(2)}</div>
        `;

        // Add event listener to delete button
        var deleteButton = cartItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            // Remove the item from cartItems array
            cartItems = cartItems.filter(function (cartItem) {
                return cartItem.productName !== item.productName;
            });

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Refresh cart items display
            loadCartItems();
            loadBillItems(); // Ensure bill items are updated too
        });

        // Add event listener to quantity input
        var quantityInput = cartItem.querySelector('.quantity-input');
        quantityInput.addEventListener('input', function () {
            // Update quantity in cartItems array
            item.quantity = parseInt(quantityInput.value);

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update the displayed subtotal for this item
            var subtotalElement = cartItem.querySelector('.product-subtotal');
            subtotalElement.textContent = 'Rs. ' + (item.productPrice * item.quantity).toFixed(2);

            // Update total price
            updateTotalPrice(cartItems);
            loadBillItems(); // Ensure bill items are updated too
        });

        // Add the cart item to the cart
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    updateTotalPrice(cartItems);
}

// Function to load existing bill items
function loadBillItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var billItemsContainer = document.querySelector('.bill-items');

    if (!billItemsContainer) {
        console.error("Element '.bill-items' not found in the DOM.");
        return;
    }

    if (cartItems.length === 0) {
        billItemsContainer.innerHTML = '<p>No items in cart.</p>';
        return;
    }

    // Clear existing bill items
    billItemsContainer.innerHTML = '';

    // Add each item to the bill
    cartItems.forEach(function (item) {
        var billItem = document.createElement('div');
        billItem.classList.add('bill-item');
        billItem.innerHTML = `
            <img src="${item.productImage}" alt="${item.productName}" style="width:60px; height:60px;">
            <div class="delete-btn fa fa-trash" style="cursor:pointer;"></div>
            <div class="product-name" style="font-size:1.5rem">${item.productName}</div>
            <div class="product-price" style="font-size:1.5rem">Rs. ${item.productPrice.toFixed(2)}</div>
            <div class="quantity"><h5 style="font-size:1rem; display:inline">Quantity</h5>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" style="width:10rem">
            </div>
            <div class="product-subtotal" style="font-size: 1rem; margin:10px 0">Rs. ${(item.productPrice * item.quantity).toFixed(2)}</div>
        `;

        // Add event listener to delete button
        var deleteButton = billItem.querySelector('.delete-btn');
        deleteButton.addEventListener('click', function () {
            // Remove the item from cartItems array
            cartItems = cartItems.filter(function (cartItem) {
                return cartItem.productName !== item.productName;
            });

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Refresh bill items display
            loadBillItems();
            loadCartItems(); // Ensure cart items are updated too
        });

        // Add event listener to quantity input
        var quantityInput = billItem.querySelector('.quantity-input');
        quantityInput.addEventListener('input', function () {
            // Update quantity in cartItems array
            item.quantity = parseInt(quantityInput.value) || 1;

            // Update local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update the displayed subtotal for this item
            var subtotalElement = billItem.querySelector('.product-subtotal');
            subtotalElement.textContent = 'Rs. ' + (item.productPrice * item.quantity).toFixed(2);

            // Update total price
            updateTotalPrice(cartItems);
            updateBillTotalPrice(cartItems)
            loadCartItems(); // Ensure cart items are updated too
        });

        // Add the bill item to the bill-items container
        billItemsContainer.appendChild(billItem);
    });

    // Update total price
    updateTotalPrice(cartItems);
    updateBillTotalPrice(cartItems)
}

// Function to update total price
function updateTotalPrice(cartItems) {
    var total = 0;
    cartItems.forEach(function (item) {
        total += item.productPrice * item.quantity;
    });
    var totalPriceElement = document.querySelector('.total-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = total.toFixed(2);
    } else {
        console.error("Element '.total-price' not found in the DOM.");
    }
}

// Function to update total price
function updateBillTotalPrice(cartItems) {
    var total = 0;
    cartItems.forEach(function (item) {
        total += item.productPrice * item.quantity;
    });
    var totalPriceElement = document.querySelector('.billtotal-price');
    if (totalPriceElement) {
        totalPriceElement.textContent = total.toFixed(2);
    } else {
        console.error("Element '.total-price' not found in the DOM.");
    }
}

// Function to calculate total price from localStorage
function calculateTotalPriceFromStorage() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var total = 0;
    cartItems.forEach(function (item) {
        total += item.productPrice * item.quantity;
    });
    return total; // Return total in INR
}


// Function to handle checkout button click
document.getElementById("rzp-button1").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default link action

    var totalPrice = calculateTotalPriceFromStorage();
    if (isNaN(totalPrice) || totalPrice <= 0) {
        alert("Invalid total price. Please check your cart.");
        return;
    }

    var options = {
        key: "rzp_test_PV1oQ0oMtgXOsq", // Enter your Razorpay Key ID
        amount: totalPrice * 100, // Amount in paise for INR
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order",
        image: "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
        theme: {
            color: "#000"
        },
        handler: function (response) {
            alert('Payment successful: ' + response.razorpay_payment_id);
            // Optionally clear the cart or redirect
            clearCart();
        },
        prefill: {
            name: "John Doe", // Pre-fill customer name (you can replace with actual user data)
            email: "john.doe@example.com", // Pre-fill customer email
            contact: "9999999999" // Pre-fill customer contact
        },
        notes: {
            address: "Razorpay Corporate Office" // Add any custom notes here
        },
        modal: {
            ondismiss: function () {
                // Handle the case when the payment popup is closed
                console.log("Payment popup closed");
            }
        }
    };

    var razorpay = new Razorpay(options);
    razorpay.open();
});


// Function to clear the cart
function clearCart() {
    localStorage.removeItem('cartItems');
    loadCartItems();
    loadBillItems();
}

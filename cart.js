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
    // Load existing cart items if any
    loadCartItems();
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
}

// Function to update total price
function updateTotalPrice(cartItems) {
    var total = 0;
    cartItems.forEach(function (item) {
        total += item.productPrice * item.quantity;
    });
    document.querySelector('.total-price').textContent = total.toFixed(2);
}

// Function to load existing cart items
function loadCartItems() {
    var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    var cartItemsContainer = document.querySelector('.cart-items');

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
        });

        // Add the cart item to the cart
        cartItemsContainer.appendChild(cartItem);
    });

    // Update total price
    updateTotalPrice(cartItems);
}



// Function to calculate total price
function calculateTotalPrice() {
    var totalPrice = 0;
    var productSubtotals = document.querySelectorAll('.product-subtotal');
    productSubtotals.forEach(function (subtotalElem) {
        totalPrice += parseFloat(subtotalElem.textContent.replace('Rs. ', '') || 0);
    });
    return totalPrice;
}

// Function to handle checkout button click
document.getElementById("rzp-button1").addEventListener("click", function (event) {
    var totalPrice = calculateTotalPrice();
    if (isNaN(totalPrice) || totalPrice <= 0) {
        alert("Invalid total price. Please check your cart.");
        return;
    }

    var options = {
        key: "rzp_test_XUaIxrJXsrP564", // Enter your Razorpay Key ID
        amount: totalPrice * 100, // Amount is in currency subunits (e.g., paise for INR). Multiply by 100 to convert to subunits
        currency: "INR",
        name: "MyShop Checkout",
        description: "This is your order",
        image: "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
        theme: {
            color: "#000"
        },
        handler: function (response) {
            alert('Payment successful: ' + response.razorpay_payment_id);
            // Perform actions after successful payment, such as updating order status or redirecting to a thank you page
        },
        prefill: {
            // Add pre-filled customer details if available
        },
        notes: {
            // Add additional information if needed
        }
    };

    var razorpay = new Razorpay(options);
    razorpay.open();
    event.preventDefault();
});

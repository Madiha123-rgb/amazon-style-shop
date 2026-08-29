// Get cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Tax rate
const TAX_RATE = 0.08;
const SHIPPING_COST = 9.99;

// Load cart items
function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart"><p>Your cart is empty</p><p><a href="home.html">Continue Shopping</a></p></div>';
        document.querySelector('.checkout-btn').disabled = true;
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">🛍️</div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button onclick="decreaseQuantity(${index})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="increaseQuantity(${index})">+</button>
                </div>
                <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
            </div>
            <div style="text-align: right; font-weight: 600;">
                $${itemTotal.toFixed(2)}
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    updateCartSummary();
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        removeItem(index);
        return;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Remove item from cart
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + (cart.length > 0 ? SHIPPING_COST : 0);
    
    document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('shipping').textContent = cart.length > 0 ? `$${SHIPPING_COST.toFixed(2)}` : '$0.00';
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${total.toFixed(2)}`;
}

// Update cart count in navbar
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

// Proceed to checkout
function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Save cart summary for payment page
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax + SHIPPING_COST;
    
    localStorage.setItem('orderSummary', JSON.stringify({
        subtotal: subtotal,
        tax: tax,
        shipping: SHIPPING_COST,
        total: total,
        items: cart
    }));
    
    window.location.href = 'payment.html';
}

// Check authentication
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Initialize page
window.addEventListener('load', function() {
    checkAuth();
    loadCart();
    updateCartCount();
});

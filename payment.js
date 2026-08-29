// Get order summary
let orderSummary = JSON.parse(localStorage.getItem('orderSummary')) || {
    subtotal: 0,
    tax: 0,
    shipping: 0,
    total: 0,
    items: []
};

// Load order items
function loadOrderItems() {
    const orderItemsContainer = document.getElementById('orderItems');
    
    orderItemsContainer.innerHTML = '';
    
    orderSummary.items.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <span>${item.name} x${item.quantity}</span>
            <span>$${itemTotal.toFixed(2)}</span>
        `;
        orderItemsContainer.appendChild(orderItem);
    });
    
    // Update summary
    document.getElementById('paymentSubtotal').textContent = `$${orderSummary.subtotal.toFixed(2)}`;
    document.getElementById('paymentShipping').textContent = `$${orderSummary.shipping.toFixed(2)}`;
    document.getElementById('paymentTax').textContent = `$${orderSummary.tax.toFixed(2)}`;
    document.getElementById('paymentTotal').textContent = `$${orderSummary.total.toFixed(2)}`;
}

// Format card number
document.getElementById('cardNumber').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    e.target.value = formattedValue;
});

// Format expiry date
document.getElementById('expiry').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Format CVV
document.getElementById('cvv').addEventListener('input', function(e) {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 4);
});

// Process payment
function processPayment() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const state = document.getElementById('state').value;
    const zip = document.getElementById('zip').value;
    const cardName = document.getElementById('cardName').value;
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiry = document.getElementById('expiry').value;
    const cvv = document.getElementById('cvv').value;
    
    // Validation
    if (!firstName || !lastName || !address || !city || !state || !zip) {
        alert('Please fill in all shipping information');
        return;
    }
    
    if (!cardName || cardNumber.length !== 16 || !expiry || cvv.length < 3) {
        alert('Please enter valid payment information');
        return;
    }
    
    // Simulate payment processing
    const processingDiv = document.createElement('div');
    processingDiv.style.position = 'fixed';
    processingDiv.style.top = '50%';
    processingDiv.style.left = '50%';
    processingDiv.style.transform = 'translate(-50%, -50%)';
    processingDiv.style.background = 'white';
    processingDiv.style.padding = '40px';
    processingDiv.style.borderRadius = '10px';
    processingDiv.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
    processingDiv.style.zIndex = '1000';
    processingDiv.innerHTML = '<p style="font-size: 18px; color: #333;">Processing payment...</p>';
    document.body.appendChild(processingDiv);
    
    setTimeout(() => {
        document.body.removeChild(processingDiv);
        
        // Show success message
        alert('Payment successful! Your order has been placed.');
        
        // Clear cart
        localStorage.removeItem('cart');
        localStorage.removeItem('orderSummary');
        
        // Redirect to home
        window.location.href = 'home.html';
    }, 2000);
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
    loadOrderItems();
});

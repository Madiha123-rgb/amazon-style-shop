// Sample products data
const products = [
    {
        id: 1,
        name: 'Wireless Headphones',
        emoji: '🎧',
        price: 79.99,
        rating: '★★★★★',
        description: 'High-quality wireless headphones'
    },
    {
        id: 2,
        name: 'Smart Watch',
        emoji: '⌚',
        price: 199.99,
        rating: '★★★★☆',
        description: 'Advanced fitness tracking'
    },
    {
        id: 3,
        name: 'Laptop',
        emoji: '💻',
        price: 899.99,
        rating: '★★★★★',
        description: 'Powerful performance laptop'
    },
    {
        id: 4,
        name: 'Smartphone',
        emoji: '📱',
        price: 699.99,
        rating: '★★★★★',
        description: 'Latest technology phone'
    },
    {
        id: 5,
        name: 'Camera',
        emoji: '📷',
        price: 499.99,
        rating: '★★★★☆',
        description: 'Professional camera'
    },
    {
        id: 6,
        name: 'Tablet',
        emoji: '📱',
        price: 349.99,
        rating: '★★★★★',
        description: 'Portable entertainment device'
    },
    {
        id: 7,
        name: 'Speaker',
        emoji: '🔊',
        price: 149.99,
        rating: '★★★★☆',
        description: 'Powerful sound speaker'
    },
    {
        id: 8,
        name: 'Gaming Console',
        emoji: '🎮',
        price: 499.99,
        rating: '★★★★★',
        description: 'Next-gen gaming experience'
    }
];

// Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Load products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image">${product.emoji}</div>
            <div class="product-info">
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">${product.rating}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show notification
    alert(`${product.name} added to cart!`);
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = total;
}

// Check authentication
function checkAuth() {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'index.html';
    }
}

// Logout
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('cart');
    window.location.href = 'index.html';
}

// Initialize page
window.addEventListener('load', function() {
    checkAuth();
    loadProducts();
    updateCartCount();
});

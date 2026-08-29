// Login form submission
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    // Basic validation
    if (email && password) {
        // Store user info in localStorage BEFORE redirecting
        localStorage.setItem('userEmail', email);
        localStorage.setItem('isLoggedIn', 'true');
        
        // Verify the data was saved
        console.log('User logged in:', email);
        console.log('isLoggedIn:', localStorage.getItem('isLoggedIn'));
        
        // Show success message
        showSuccess('Login successful! Redirecting...');
        
        // Redirect to home page after 500ms
        setTimeout(() => {
            window.location.href = 'home.html';
        }, 500);
    } else {
        showError('Please fill in all fields');
    }
});

// Check if user is logged in on page load
window.addEventListener('load', function() {
    // Only redirect if already logged in AND on login page
    if (localStorage.getItem('isLoggedIn') === 'true' && window.location.pathname.includes('index.html')) {
        window.location.href = 'home.html';
    }
});

// Helper function to show error
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        console.error('Error:', message);
    }
}

// Helper function to show success
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.classList.add('show');
        console.log('Success:', message);
    }
}

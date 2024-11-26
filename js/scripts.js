document.addEventListener('DOMContentLoaded', () => {
    // Toggle password visibility
    const togglePassword = document.querySelectorAll('.toggle-password');
    
    togglePassword.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const passwordField = e.target.closest('.password-wrapper').querySelector('input[type="password"], input[type="text"]');
            if (passwordField) {
                if (passwordField.type === 'password') {
                    passwordField.type = 'text';
                    // Change icon to indicate visibility
                    e.target.src = './graphics/graphics5.png'; // Set to visible icon
                } else {
                    passwordField.type = 'password';
                    // Change icon back
                    e.target.src = './graphics/graphics4.png'; // Set to hidden icon
                }
            }
        });
    });

    // Basic form validation (optional)
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            const email = loginForm.querySelector('input[type="email"]');
            const password = loginForm.querySelector('input[type="password"]');
            
            if (!email.value || !password.value) {
                e.preventDefault(); // Prevent form submission
                alert('Please fill in all required fields.');
            }
        });
    }
});


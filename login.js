document.addEventListener('DOMContentLoaded', () => {
    const loginOverlay = document.getElementById('login-overlay');
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Function to handle login
    function handleLogin(event) {
        event.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // Replace these with your desired username and password
        const correctUsername = 'admin';
        const correctPassword = 'password123';
        
        if (username === correctUsername && password === correctPassword) {
            loginOverlay.classList.remove('show');
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            alert('Incorrect username or password');
        }
    }

    // Add event listener for form submission
    loginForm.addEventListener('submit', handleLogin);

    // Add event listener for Enter key on password field
    passwordInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleLogin(event);
        }
    });

    // Check login status on page load
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        loginOverlay.classList.add('show');
    }
});
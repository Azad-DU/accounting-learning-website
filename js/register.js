// js/register.js

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const statusDiv = document.getElementById('form-status');

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Stop the page from reloading

        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('password-confirm').value;

        // 1. Client-side validation: Check if passwords match
        if (password !== confirmPassword) {
            statusDiv.className = 'form-status-error';
            statusDiv.textContent = 'Passwords do not match!';
            return; // Stop the function here
        }

        statusDiv.className = 'form-status-sending';
        statusDiv.textContent = 'Creating account...';

        // 2. Send the data to our back-end register API
        fetch('http://localhost:5000/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
            credentials:'include'
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                // If response is not ok (e.g., 409 Conflict), throw an error with the server's message
                throw new Error(data.error || 'Something went wrong');
            }
            return data;
        })
        .then(data => {
            // 3. Handle a successful response
            statusDiv.className = 'form-status-success';
            statusDiv.textContent = data.message + " Redirecting to login...";
            // After 2 seconds, redirect to the login page
            setTimeout(() => {
                window.location.href = 'login.html'; // We will create login.html next
            }, 2000);
        })
        .catch(error => {
            // 4. Handle errors from the server (e.g., "Username already exists")
            console.error('Registration Error:', error);
            statusDiv.className = 'form-status-error';
            statusDiv.textContent = error.message;
        });
    });
});
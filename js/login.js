// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const statusDiv = document.getElementById('form-status');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        statusDiv.textContent = 'Logging in...';

        const formData = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        };

        fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
            credentials:'include'
        })
        .then(async response => {
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Something went wrong');
            }
            return data;
        })
        .then(data => {
            statusDiv.className = 'form-status-success';
            statusDiv.textContent = data.message + " Redirecting...";
            // After a short delay, redirect to the homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        })
        .catch(error => {
            statusDiv.className = 'form-status-error';
            statusDiv.textContent = error.message;
        });
    });
});
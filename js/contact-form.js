// js/contact-form.js

document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  const statusDiv = document.getElementById('form-status');

  contactForm.addEventListener('submit', function(event) {
    // 1. Prevent the default form submission which reloads the page
    event.preventDefault();

    // 2. Show a "sending" message
    statusDiv.className = 'form-status-sending';
    statusDiv.innerHTML = 'Sending...';

    // 3. Collect the data from the form fields
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      subject: document.getElementById('subject').value,
      message: document.getElementById('message').value
    };

    // 4. Send the data to our back-end API using fetch()
    fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST', // We are sending data, so we use the POST method
      headers: {
        'Content-Type': 'application/json', // Tell the server we're sending JSON
      },
      body: JSON.stringify(formData), // Convert our JS object to a JSON string
      credentials:'include'
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      statusDiv.className = 'form-status-success';
      statusDiv.textContent = data.message; // Display success message from server
      contactForm.reset(); // Clear the form
    })
    .catch((error) => {
      console.error('Error:', error);
      statusDiv.className = 'form-status-error';
      statusDiv.textContent = 'Sorry, there was an error sending your message.';
    });
  });
});
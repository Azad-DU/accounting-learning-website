// js/script.js - Final and Complete Version

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECT ALL NECESSARY ELEMENTS ---
    // For Dynamic Navigation & Auth
    const loggedInElements = document.querySelectorAll('.logged-in');
    const loggedOutElements = document.querySelectorAll('.logged-out');
    const usernameSpan = document.getElementById('nav-username');
    const logoutBtn = document.getElementById('logout-btn');

    // For Modals
    const progressModal = document.getElementById('progress-modal');
    const viewProgressBtn = document.getElementById('view-progress');
    const progressCloseButton = progressModal ? progressModal.querySelector('.close-button') : null;
    const progressDetails = document.getElementById('progress-details');

    const loginPromptModal = document.getElementById('login-prompt-modal');
    const loginPromptCloseButton = loginPromptModal ? loginPromptModal.querySelector('.close-button') : null;
    
    // For Hamburger Menu
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav');

    // For Progress Tracking
    const markCompleteBtn = document.getElementById('mark-topic-complete');


    // --- 2. SESSION CHECK & DYNAMIC UI UPDATES ---
    // This is the core logic that runs on every page load to check login status.
    fetch('http://localhost:5000/api/check_session', { credentials: 'include' })
        .then(response => {
            if (!response.ok) {
                console.error("Network response was not ok for session check");
            }
            return response.json();
        })
        .then(data => {
            if (data.logged_in) {
                // USER IS LOGGED IN
                loggedInElements.forEach(el => el.style.display = 'inline-block');
                loggedOutElements.forEach(el => el.style.display = 'none');
                if (usernameSpan) {
                    usernameSpan.textContent = `Welcome, ${data.username}`;
                }
            } else {
                // USER IS LOGGED OUT
                loggedInElements.forEach(el => el.style.display = 'none');
                loggedOutElements.forEach(el => el.style.display = 'inline-block');

                // Show the login prompt modal once per browser session
                if (!sessionStorage.getItem('loginPromptShown')) {
                    if (loginPromptModal) {
                        loginPromptModal.style.display = 'block';
                    }
                    sessionStorage.setItem('loginPromptShown', 'true');
                }
            }
        })
        .catch(error => {
            console.error("Could not connect to the back-end to check session. Is the server running?", error);
            // On failure to connect, default to the logged-out view
            loggedInElements.forEach(el => el.style.display = 'none');
            loggedOutElements.forEach(el => el.style.display = 'inline-block');
        });

    
    // --- 3. EVENT LISTENERS ---

    // Logout Button
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            fetch('http://localhost:5000/api/logout', { method: 'POST', credentials: 'include' })
                .then(() => {
                    alert('You have been logged out.');
                    // Handle redirection correctly based on the current page's location
                    if (window.location.pathname.includes('/topics/')) {
                        window.location.href = '../index.html';
                    } else {
                        window.location.href = 'index.html';
                    }
                });
        });
    }

    // Hamburger Menu
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // "View Progress" Modal
    if (viewProgressBtn && progressModal && progressCloseButton) {
        const allTopics = [
            { id: 'basic-accounting-equation', name: 'Basic Accounting Equation' },
            { id: 'debits-credits', name: 'Debits & Credits' },
            { id: 'financial-statements', name: 'Financial Statements' },
            { id: 'journal-entry', name: 'The Journal Entry' }
        ];

        const openProgressModal = () => {
            const progressData = JSON.parse(localStorage.getItem('accountingProgress')) || {};
            progressDetails.innerHTML = '';
            const ul = document.createElement('ul');
            allTopics.forEach(topic => {
                const isCompleted = progressData[topic.id] && progressData[topic.id].completed;
                const li = document.createElement('li');
                li.className = isCompleted ? 'completed' : 'incomplete';
                li.innerHTML = `<span>${topic.name}</span><span class="progress-status">${isCompleted ? 'Completed' : 'Incomplete'}</span>`;
                ul.appendChild(li);
            });
            progressDetails.appendChild(ul);
            progressModal.style.display = 'block';
        };

        const closeProgressModal = () => {
            progressModal.style.display = 'none';
        };

        viewProgressBtn.addEventListener('click', (event) => {
            event.preventDefault();
            openProgressModal();
        });
        progressCloseButton.addEventListener('click', closeProgressModal);
    }
    
    // "Please Login" Prompt Modal Close Button
    if (loginPromptModal && loginPromptCloseButton) {
        loginPromptCloseButton.addEventListener('click', () => {
            loginPromptModal.style.display = 'none';
        });
    }

    // Universal listener to close any modal when clicking outside of it
    window.addEventListener('click', (event) => {
        if (event.target == progressModal) {
            progressModal.style.display = 'none';
        }
        if (event.target == loginPromptModal) {
            loginPromptModal.style.display = 'none';
        }
    });

    // "Mark Topic as Complete" Button Logic
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            const topicId = markCompleteBtn.getAttribute('data-topic-id');
            if (topicId) {
                let progressData = JSON.parse(localStorage.getItem('accountingProgress')) || {};
                progressData[topicId] = { ...progressData[topicId], completed: true };
                localStorage.setItem('accountingProgress', JSON.stringify(progressData));
                alert(`Topic marked as complete!`);
                markCompleteBtn.textContent = 'Topic Complete!';
                markCompleteBtn.disabled = true;
            }
        });
    }

});
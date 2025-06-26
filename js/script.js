// Wait for the HTML document to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // --- Progress Modal Functionality ---
    const viewProgressBtn = document.getElementById('view-progress');
    const progressModal = document.getElementById('progress-modal');
    const closeButton = document.querySelector('.close-button');
    const progressDetails = document.getElementById('progress-details');

    // List of all topics available on the website
    const allTopics = [
        { id: 'basic-accounting-equation', name: 'Basic Accounting Equation' },
        { id: 'debits-credits', name: 'Debits & Credits' },
        { id: 'financial-statements', name: 'Financial Statements' },
        { id: 'journal-entry', name: 'The Journal Entry' }
        // Add more topics here as you create them
    ];

    // Function to open the progress modal
    const openModal = () => {
        // Get progress data from browser's local storage
        const progressData = JSON.parse(localStorage.getItem('accountingProgress')) || {};
        
        // Clear previous details
        progressDetails.innerHTML = '';

        if (allTopics.length > 0) {
            const ul = document.createElement('ul');
            allTopics.forEach(topic => {
                const isCompleted = progressData[topic.id] && progressData[topic.id].completed;
                
                const li = document.createElement('li');
                li.className = isCompleted ? 'completed' : 'incomplete';
                
                const topicNameSpan = document.createElement('span');
                topicNameSpan.textContent = topic.name;
                
                const statusSpan = document.createElement('span');
                statusSpan.className = 'progress-status';
                statusSpan.textContent = isCompleted ? 'Completed' : 'Incomplete';
                
                li.appendChild(topicNameSpan);
                li.appendChild(statusSpan);
                ul.appendChild(li);
            });
            progressDetails.appendChild(ul);
        } else {
            progressDetails.innerHTML = '<p>No topics available yet.</p>';
        }

        progressModal.style.display = 'block';
    };

    // Function to close the progress modal
    const closeModal = () => {
        progressModal.style.display = 'none';
    };

    // Event listeners for the modal
    if (viewProgressBtn && progressModal && closeButton) {
        viewProgressBtn.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the link from navigating
            openModal();
        });

        closeButton.addEventListener('click', closeModal);

        // Close modal if user clicks outside of the modal content
        window.addEventListener('click', (event) => {
            if (event.target == progressModal) {
                closeModal();
            }
        });
    }

    // --- Mark Topic as Complete Functionality (found on topic pages) ---
    const markCompleteBtn = document.getElementById('mark-topic-complete');
    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            const topicId = markCompleteBtn.getAttribute('data-topic-id');
            if (topicId) {
                // Get existing progress, or create a new object
                let progressData = JSON.parse(localStorage.getItem('accountingProgress')) || {};
                
                // Update the specific topic's status
                progressData[topicId] = { ...progressData[topicId], completed: true };

                // Save the updated progress back to local storage
                localStorage.setItem('accountingProgress', JSON.stringify(progressData));

                alert(`Topic "${topicId.replace(/-/g, ' ')}" marked as complete!`);
                markCompleteBtn.textContent = 'Topic Complete!';
                markCompleteBtn.disabled = true;
                markCompleteBtn.style.backgroundColor = '#28a745'; // Green color
            }
        });
    }
    // Add this new code block inside the DOMContentLoaded listener in js/script.js

    // --- Active Navigation Link Logic ---
    // This code will run on every page to highlight the correct nav link.

    // Get the filename of the current page (e.g., "about.html", "index.html")
    const activePage = window.location.pathname.split('/').pop();

    // Select all the links in the main navigation
    const navLinks = document.querySelectorAll('header nav a');

    navLinks.forEach(link => {
        // Get the filename from the link's href attribute
        const linkPage = link.getAttribute('href').split('/').pop();

        // Check for a match.
        // The second condition handles the homepage, where the activePage might be empty.
        if (linkPage === activePage || (activePage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    // Add this new code block inside the DOMContentLoaded listener in js/script.js

    // --- Hamburger Menu Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.querySelector('header nav');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggles the 'active' class on the nav menu
            navMenu.classList.toggle('active');
        });
    }
});
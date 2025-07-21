// portfolio-animations.js

document.addEventListener('DOMContentLoaded', function() {
    // Animate skill bars
    document.querySelectorAll('.skill-bar').forEach(function(bar) {
        const percent = bar.getAttribute('data-skill');
        if (percent) {
            bar.style.setProperty('--bar-width', percent + '%');
            setTimeout(() => {
                bar.style.width = percent + '%';
            }, 300);
        }
    });

    // Optional: Add fade-in for photos
    document.querySelectorAll('.portfolio-photo').forEach(function(photo, i) {
        photo.style.opacity = 0;
        setTimeout(() => {
            photo.style.transition = 'opacity 0.8s';
            photo.style.opacity = 1;
        }, 200 + i * 200);
    });

    // Optional: Animate achievement items
    document.querySelectorAll('.achievement-item').forEach(function(item, i) {
        item.style.opacity = 0;
        setTimeout(() => {
            item.style.transition = 'opacity 0.8s, transform 0.8s';
            item.style.opacity = 1;
            item.style.transform = 'translateX(0)';
        }, 200 + i * 250);
    });

    // --- Sliding Nav Background (Desktop Only) ---
    function updateNavSlider(targetLink) {
        const navSlider = document.getElementById('nav-slider');
        if (!navSlider || !targetLink) return;
        const rect = targetLink.getBoundingClientRect();
        const navRect = targetLink.closest('nav').getBoundingClientRect();
        navSlider.style.width = (rect.width + 24) + 'px'; // 24px wider than text
        navSlider.style.left = (targetLink.offsetLeft - 12) + 'px'; // 12px padding on each side
    }
    function setActiveNavLink() {
        const links = document.querySelectorAll('nav .nav-link');
        let found = false;
        links.forEach(link => {
            if (link.href && window.location.pathname.endsWith(link.getAttribute('href'))) {
                link.classList.add('active');
                updateNavSlider(link);
                found = true;
            } else {
                link.classList.remove('active');
            }
        });
        // Fallback: highlight Portfolio if nothing else matches
        if (!found && links.length > 0) {
            links[0].classList.add('active');
            updateNavSlider(links[0]);
        }
    }
    function navSliderClickHandler(e) {
        if (window.innerWidth <= 820) return;
        const navSlider = document.getElementById('nav-slider');
        if (!navSlider) return;
        const links = document.querySelectorAll('nav .nav-link');
        links.forEach(link => link.classList.remove('active'));
        e.target.classList.add('active');
        updateNavSlider(e.target);
    }
    if (window.innerWidth > 820) {
        setActiveNavLink();
        const links = document.querySelectorAll('nav .nav-link');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                // Only animate slider if not opening in new tab
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
                    navSliderClickHandler(e);
                }
            });
        });
        window.addEventListener('resize', setActiveNavLink);
    }
}); 
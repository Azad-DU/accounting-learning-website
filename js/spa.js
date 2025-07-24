// js/spa.js

document.addEventListener('DOMContentLoaded', function() {
    const spaContent = document.getElementById('spa-content');
    const navSlider = document.getElementById('nav-slider');
    const navLinks = document.querySelectorAll('nav .nav-link');

    // Content for each section
    const pages = {
        home: `
            <section class="text-center py-12">
                <h2 class="text-4xl font-bold mb-4 text-sky-700">Welcome to Your Accounting Learning Journey!</h2>
                <p class="text-lg text-gray-700 mb-8">Master the fundamentals of accounting with interactive lessons, quizzes, and diagrams designed for students.</p>
                <a href="topics/basic-accounting-equation.html" class="inline-block bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-sky-600 transition mb-4">Start Learning</a>
                <a href="topics/financial-ratio-analysis.html" class="inline-block bg-sky-500 text-white font-semibold px-8 py-3 rounded-lg shadow hover:bg-sky-600 transition ml-4 mb-4">Ratio Analysis Article</a>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-bold text-sky-700 mb-2">Interactive Lessons</h3>
                        <p class="text-gray-600">Engage with concepts through clear explanations and examples.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-bold text-sky-700 mb-2">Practical Quizzes</h3>
                        <p class="text-gray-600">Test your knowledge and reinforce your understanding.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-bold text-sky-700 mb-2">Visual Diagrams</h3>
                        <p class="text-gray-600">Understand complex ideas with easy-to-follow interactive visuals.</p>
                    </div>
                    <div class="bg-white rounded-lg shadow p-6">
                        <h3 class="text-xl font-bold text-sky-700 mb-2">Track Your Progress</h3>
                        <p class="text-gray-600">Monitor your learning journey and see your achievements.</p>
                    </div>
                </div>
            </section>
        `,
        about: `
            <section class="max-w-2xl mx-auto py-12 animate-fade-in">
                <h2 class="text-4xl font-extrabold text-sky-700 mb-6">About Us</h2>
                <div class="bg-white rounded-xl shadow-lg p-8 mb-6">
                    <p class="text-gray-700 mb-4 text-lg leading-relaxed">We are dedicated to making accounting easy and accessible for everyone. Our mission is to provide clear, interactive, and practical resources for students and professionals alike.</p>
                    <p class="text-gray-700 text-lg leading-relaxed">Whether you're just starting or looking to brush up on your skills, our platform is designed to support your learning journey every step of the way.</p>
                </div>
            </section>
        `,
        contact: `
            <section class="max-w-xl mx-auto py-12 animate-fade-in">
                <h2 class="text-4xl font-extrabold text-sky-700 mb-6">Contact Us</h2>
                <form class="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Your Name">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Your Email">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" rows="5" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 text-lg">Send Message</button>
                </form>
            </section>
        `,
        register: `
            <section class="max-w-md mx-auto py-12 animate-fade-in">
                <h2 class="text-4xl font-extrabold text-sky-700 mb-6">Register</h2>
                <form class="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Username</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Username">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Email">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Password">
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 text-lg">Register</button>
                </form>
            </section>
        `,
        login: `
            <section class="max-w-md mx-auto py-12 animate-fade-in">
                <h2 class="text-4xl font-extrabold text-sky-700 mb-6">Login</h2>
                <form class="bg-white rounded-xl shadow-lg p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Username</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Username">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" class="w-full border border-gray-300 rounded px-4 py-3 focus:outline-none focus:ring-2 focus:ring-sky-400 text-lg" placeholder="Password">
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 text-lg">Login</button>
                </form>
            </section>
        `,
        'topic-basic-accounting-equation': `
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Basic Accounting Equation</h2>
                <p class="text-gray-700">Assets = Liabilities + Equity. This is the foundation of double-entry accounting and the basis for all financial statements.</p>
            </section>
        `,
        'topic-debits-credits': `
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Debits & Credits</h2>
                <p class="text-gray-700">Debits and credits are the building blocks of accounting. Every transaction affects at least two accounts, keeping the equation balanced.</p>
            </section>
        `,
        'topic-financial-statements': `
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Financial Statements</h2>
                <p class="text-gray-700">Financial statements summarize the financial performance and position of a business. The main statements are the balance sheet, income statement, and cash flow statement.</p>
            </section>
        `,
        'topic-journal-entry': `
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Journal Entry</h2>
                <p class="text-gray-700">A journal entry records a business transaction in the accounting records. Each entry includes a date, accounts affected, amounts, and a description.</p>
            </section>
        `,
        'topic-financial-ratio-analysis': `
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Ratio Analysis</h2>
                <p class="text-gray-700">Ratio analysis helps interpret financial statements and assess a company's performance using key ratios like liquidity, profitability, and solvency.</p>
            </section>
        `
    };

    function loadPage(hash) {
        let page = hash.replace('#', '') || 'home';
        if (!pages[page]) page = 'home';
        spaContent.innerHTML = pages[page];
    }

    function updateNavSlider(targetLink) {
        if (!navSlider || !targetLink) return;
        const rect = targetLink.getBoundingClientRect();
        const navRect = targetLink.closest('nav').getBoundingClientRect();
        navSlider.style.width = rect.width + 'px';
        navSlider.style.left = (targetLink.offsetLeft) + 'px';
    }

    function setActiveNavLink(hash) {
        let found = false;
        navLinks.forEach(link => {
            if (link.getAttribute('href') === hash) {
                link.classList.add('text-sky-500', 'font-bold');
                updateNavSlider(link);
                found = true;
            } else {
                link.classList.remove('text-sky-500', 'font-bold');
            }
        });
        if (!found && navLinks.length > 0) {
            navLinks[0].classList.add('text-sky-500', 'font-bold');
            updateNavSlider(navLinks[0]);
        }
    }

    // SPA navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                window.location.hash = href;
                loadPage(href);
                setActiveNavLink(href);
            }
        });
    });
    // Also handle topic dropdown links
    document.querySelectorAll('ul li ul a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.startsWith('#topic-')) {
                e.preventDefault();
                window.location.hash = href;
                loadPage(href);
                setActiveNavLink(href);
            }
        });
    });

    // On hash change (back/forward navigation)
    window.addEventListener('hashchange', function() {
        loadPage(window.location.hash);
        setActiveNavLink(window.location.hash);
    });

    // Initial load
    loadPage(window.location.hash);
    setActiveNavLink(window.location.hash);

    // --- Mobile Navigation Logic ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    let mobileNav = null;
    function closeMobileNav() {
        if (mobileNav) {
            mobileNav.classList.add('hidden');
            document.body.classList.remove('overflow-hidden');
        }
    }
    function openMobileNav() {
        if (!mobileNav) {
            mobileNav = document.createElement('div');
            mobileNav.id = 'mobile-nav-overlay';
            mobileNav.className = 'fixed inset-0 z-50 flex';
            mobileNav.innerHTML = `
                <div class="flex-1 bg-black bg-opacity-40" id="mobile-nav-bg"></div>
                <nav class="w-80 max-w-full bg-white text-gray-900 shadow-lg h-full p-8 pt-12 transform translate-x-full transition-transform duration-300" id="mobile-nav-panel">
                    <button id="close-mobile-nav" class="absolute top-4 right-4 text-2xl text-gray-500 hover:text-sky-500 focus:outline-none">&times;</button>
                    <ul class="flex flex-col space-y-4 text-lg font-semibold">
                        <li><a href="#home" class="nav-link-mobile block py-2 px-4 rounded hover:bg-sky-100">Home</a></li>
                        <li class="relative group">
                            <button class="w-full flex items-center justify-between py-2 px-4 rounded hover:bg-sky-100 focus:outline-none" id="mobile-topics-btn">Topics <svg class="ml-2 w-4 h-4 inline-block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/></svg></button>
                            <ul class="hidden flex-col mt-2 ml-2 bg-gray-50 rounded shadow-inner" id="mobile-topics-list">
                                <li><a href="#topic-basic-accounting-equation" class="block px-6 py-3 hover:bg-sky-100">Basic Accounting Equation</a></li>
                                <li><a href="#topic-debits-credits" class="block px-6 py-3 hover:bg-sky-100">Debits & Credits</a></li>
                                <li><a href="#topic-financial-statements" class="block px-6 py-3 hover:bg-sky-100">Financial Statements</a></li>
                                <li><a href="#topic-journal-entry" class="block px-6 py-3 hover:bg-sky-100">Journal Entry</a></li>
                                <li><a href="#topic-financial-ratio-analysis" class="block px-6 py-3 hover:bg-sky-100">Ratio Analysis</a></li>
                            </ul>
                        </li>
                        <li><a href="#about" class="nav-link-mobile block py-2 px-4 rounded hover:bg-sky-100">About</a></li>
                        <li><a href="#contact" class="nav-link-mobile block py-2 px-4 rounded hover:bg-sky-100">Contact</a></li>
                        <li><a href="portfolio.html" class="block py-2 px-4 rounded hover:bg-sky-100" target="_blank" rel="noopener">Portfolio</a></li>
                        <li><a href="#register" class="nav-link-mobile block py-2 px-4 rounded hover:bg-sky-100">Register</a></li>
                        <li><a href="#login" class="nav-link-mobile block py-2 px-4 rounded hover:bg-sky-100">Login</a></li>
                    </ul>
                </nav>
            `;
            document.body.appendChild(mobileNav);
        }
        mobileNav.classList.remove('hidden');
        setTimeout(() => {
            document.getElementById('mobile-nav-panel').classList.remove('translate-x-full');
        }, 10);
        document.body.classList.add('overflow-hidden');

        // Close logic
        document.getElementById('close-mobile-nav').onclick = closeMobileNav;
        document.getElementById('mobile-nav-bg').onclick = closeMobileNav;
        // Expand/collapse topics
        const topicsBtn = document.getElementById('mobile-topics-btn');
        const topicsList = document.getElementById('mobile-topics-list');
        topicsBtn.onclick = function() {
            topicsList.classList.toggle('hidden');
        };
        // Close on link click
        mobileNav.querySelectorAll('a').forEach(link => {
            link.onclick = function() {
                closeMobileNav();
            };
        });
    }
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openMobileNav);
    }
}); 
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
            <section class="max-w-2xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">About Us</h2>
                <p class="text-gray-700 mb-4">We are dedicated to making accounting easy and accessible for everyone. Our mission is to provide clear, interactive, and practical resources for students and professionals alike.</p>
                <p class="text-gray-700">Whether you're just starting or looking to brush up on your skills, our platform is designed to support your learning journey every step of the way.</p>
            </section>
        `,
        contact: `
            <section class="max-w-xl mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Contact Us</h2>
                <form class="bg-white rounded-lg shadow p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Name</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Your Name">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Your Email">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Message</label>
                        <textarea class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" rows="5" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition">Send Message</button>
                </form>
            </section>
        `,
        register: `
            <section class="max-w-md mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Register</h2>
                <form class="bg-white rounded-lg shadow p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Username</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Username">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Email</label>
                        <input type="email" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Email">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Password">
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition">Register</button>
                </form>
            </section>
        `,
        login: `
            <section class="max-w-md mx-auto py-12">
                <h2 class="text-3xl font-bold text-sky-700 mb-4">Login</h2>
                <form class="bg-white rounded-lg shadow p-8 space-y-6">
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Username</label>
                        <input type="text" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Username">
                    </div>
                    <div>
                        <label class="block text-gray-700 font-semibold mb-2">Password</label>
                        <input type="password" class="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-400" placeholder="Password">
                    </div>
                    <button type="submit" class="w-full bg-sky-500 text-white font-semibold py-3 rounded-lg hover:bg-sky-600 transition">Login</button>
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
}); 
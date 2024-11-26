document.addEventListener('DOMContentLoaded', () => {
    // Sidebar Navigation Active State Toggle
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all menu items
            menuItems.forEach(menu => menu.classList.remove('active'));
            // Add active class to the clicked menu item
            this.classList.add('active');
        });
    });

    // Notification Icon Click Handler
    const notificationIcon = document.querySelector('.notification-icon');
    notificationIcon.addEventListener('click', () => {
        alert('You have new notifications!');
    });

    // Search Bar Filter Functionality
    const searchBar = document.querySelector('.search-bar');
    searchBar.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        filterContent(query);
    });

    function filterContent(query) {
        // Filter Today's Classes
        const classItems = document.querySelectorAll('.class-item');
        classItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });

        // Filter Today's News
        const newsItems = document.querySelectorAll('.news-item');
        newsItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });

        // Filter Daily Notices
        const noticeItems = document.querySelectorAll('.notice-item');
        noticeItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query) ? '' : 'none';
        });
    }

    // Scroll Today's News Horizontally
    const newsSection = document.querySelector('.news-section');
    let isDown = false;
    let startX;
    let scrollLeft;

    newsSection.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - newsSection.offsetLeft;
        scrollLeft = newsSection.scrollLeft;
    });

    newsSection.addEventListener('mouseleave', () => {
        isDown = false;
    });

    newsSection.addEventListener('mouseup', () => {
        isDown = false;
    });

    newsSection.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - newsSection.offsetLeft;
        const walk = (x - startX) * 2; // Scroll speed
        newsSection.scrollLeft = scrollLeft - walk;
    });
});

// Replace with the actual registration number of the user (could be dynamically set)
const regNumber = "arjun.mehta@example.com";

// Function to fetch and update user details
async function updateUserDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/student/${regNumber}`);
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data = await response.json();

        // Update DOM elements
        document.querySelector('.user-name').textContent = data.sname || "N/A";
        document.querySelector('.user-reg').textContent = data.sid || "N/A";
        loadPage('dashboard');
    } catch (error) {
        console.error("Error updating user details:", error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateUserDetails);


// Function to Load Pages Dynamically
function loadPage(page) {
    const contentElement = document.querySelector('.main-content');
    
    // Remove any previously loaded page-specific CSS
    const oldCss = document.getElementById('page-specific-css');
    if (oldCss) oldCss.remove();

    // Fetch the HTML content for the page
    fetch(`./pages/${page}.html`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Page not found');
            }
            return response.text();
        })
        .then(html => {
            // Inject the fetched HTML into the main content area
            contentElement.innerHTML = html;

            // Dynamically load the CSS file for the page
            const cssFile = document.createElement('link');
            cssFile.rel = 'stylesheet';
            cssFile.href = `./css/${page}.css`; // Assuming the CSS file is named after the page
            cssFile.id = 'page-specific-css';
            document.head.appendChild(cssFile);

            // Update the active menu item
            updateActiveMenu(page);
        })
        .catch(error => {
            console.error('Error loading page:', error);
            // Display an error message if the page cannot be loaded
            contentElement.innerHTML = `<h1>Error 404</h1><p>The requested page could not be found.</p>`;
        });
}

// Update active menu item
function updateActiveMenu(activePage) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[onclick="loadPage('${activePage}')"]`).classList.add('active');
}

// Add Event Listeners to Menu Items
document.querySelectorAll('.menu-item').forEach((menuItem, index) => {
    const pageMap = ['dashboard', 'personalDetails', 'attendance', 'timetable', 'clubs', 'academics', 'notice', 'schedule'];
    if (pageMap[index]) {
        menuItem.addEventListener('click', event => {
            event.preventDefault();
            loadPage(pageMap[index]);
        });
    }
});
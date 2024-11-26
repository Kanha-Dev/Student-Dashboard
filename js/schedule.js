
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
});

// Replace with the actual registration number of the user (could be dynamically set)
const regNumber = "arjun.mehta@example.com";

// Function to fetch and structure today's schedule
async function fetchAndStructureSchedule(sid) {
    try {
        // Fetch the data from the API
        const response = await fetch(`http://localhost:3000/api/todaysSchedule/${sid}`);
        if (!response.ok) throw new Error("Failed to fetch today's schedule");

        // Parse the JSON response
        const data = await response.json();

        // Structure the data into a more readable format
        const structuredData = data.map((item) => ({
            periodId: item.pid || "N/A",         // Period ID
            subjectName: item.subname || "N/A", // Subject name
            time: item.time || "N/A",           // Scheduled time
            date: item.date || "N/A",           // Scheduled date
        }));

        return structuredData; // Return the structured data
    } catch (error) {
        console.error("Error fetching and structuring schedule:", error);
        return []; // Return an empty array if an error occurs
    }
}

// Example usage
(async () => {
    const sid = "1"; // Example SID
    const schedule = await fetchAndStructureSchedule(sid);
    console.log("Structured Schedule:", schedule);
})();




// Update active menu item
function updateActiveMenu(activePage) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[onclick="loadPage('${activePage}')"]`).classList.add('active');
}
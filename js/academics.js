
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

// Function to fetch and update user details
async function updateUserDetails() {
    try {
        const response = await fetch(`http://localhost:3000/api/student/${regNumber}`);
        if (!response.ok) throw new Error("Failed to fetch student data");

        const data = await response.json();

        // Update DOM elements
         // Update DOM elements only if they haven't been updated before
        const nameElement = document.getElementById("nameheading");
        nameElement.textContent = "Welcome back, " + data.sname + "!" || "N/A";
        document.querySelector('.user-name').textContent = data.sname || "N/A";
        document.querySelector('.user-reg').textContent = data.sid || "N/A";
        
        const sid = data.sid;
        const response2 = await fetch(`http://localhost:3000/api/studentMarks/${sid}`);
        if (!response2.ok) throw new Error("Failed to fetch student marks");

        const data2 = await response2.json();

        //Other elements
        document.getElementById("maths").textContent = data2[0].marks || "N/A";

        // Store sid in local storage for use in other files
        if (data.sid) {
            localStorage.setItem('sid', data.sid);
            console.log(`SID ${data.sid} stored in local storage.`);
        } else {
            console.warn("SID is missing in the response data.");
        }
    } catch (error) {
        console.error("Error updating user details:", error);
    }
}

// Call the function when the page loads
document.addEventListener('DOMContentLoaded', updateUserDetails);

// Update active menu item
function updateActiveMenu(activePage) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[onclick="loadPage('${activePage}')"]`).classList.add('active');
}
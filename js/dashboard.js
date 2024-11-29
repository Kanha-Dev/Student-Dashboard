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
         // Update DOM elements only if they haven't been updated before
        const nameElement = document.getElementById("name");
        nameElement.textContent = "Welcome back, " + data.sname + "!" || "N/A";
        document.querySelector('.user-name').textContent = data.sname || "N/A";
        document.querySelector('.user-reg').textContent = data.sid || "N/A";

        // Store sid in local storage for use in other files
        if (data.sid) {
            localStorage.setItem('sid', data.sid);
            localStorage.setItem('email', regNumber);
            console.log(`SID ${data.sid} stored in local storage.`);
        } else {
            console.warn("SID is missing in the response data.");
        }
    } catch (error) {
        console.error("Error updating user details:", error);
    }
}

async function updateTodaysSchedule() {
    try {
      const sid = "1"; // Replace with dynamic SID if available
      const response = await fetch(`http://localhost:3000/api/todaysSchedule/${sid}`);
      if (!response.ok) throw new Error("Failed to fetch today's schedule");
  
      const scheduleData = await response.json();
  
      // Reference the container for the schedule
      const classesContent = document.querySelector('.classes-content');
      classesContent.innerHTML = ''; // Clear existing content
  
      // Populate schedule data if available
      if (scheduleData.length > 0) {
        scheduleData.forEach(schedule => {
          const classItem = document.createElement('div');
          classItem.classList.add('class-item');
          classItem.textContent = `${schedule.subname} - ${schedule.time}`;
          classesContent.appendChild(classItem);
        });
      } else {
        // Display a message if no classes are scheduled
        classesContent.innerHTML = '<div class="no-classes">No classes scheduled for today!</div>';
      }
    } catch (error) {
      console.error("Error updating today's schedule:", error);
      const classesContent = document.querySelector('.classes-content');
      classesContent.innerHTML = '<div class="error-message">Failed to load schedule. Please try again later.</div>';
    }
  }
  
  
  // Call the function with the appropriate student ID when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    const studentId = "1"; // Replace with dynamic student ID if available
    updateUserDetails();
    updateTodaysSchedule();
  });
  


// Update active menu item
function updateActiveMenu(activePage) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[onclick="loadPage('${activePage}')"]`).classList.add('active');
}
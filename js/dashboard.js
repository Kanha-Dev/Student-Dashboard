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

// Function to dynamically populate today's schedule
async function populateTodaysSchedule(studentId) {
    const scheduleApiUrl = `http://localhost:3000/api/todaysSchedule/${studentId}`;
  
    try {
      // Fetch schedule data
      const response = await fetch(scheduleApiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch today's schedule! Status: ${response.status}`);
      }
  
      const scheduleData = await response.json();
  
      // Reference to the container where class cards will be added
      const classesListContainer = document.querySelector('.classes-list');
      classesListContainer.innerHTML = ''; // Clear existing content
  
      // Loop through each class and create HTML elements
      scheduleData.forEach(schedule => {
        const classCard = document.createElement('div');
        classCard.classList.add('class-card');
  
        // Class Card Header
        const classCardHeader = document.createElement('div');
        classCardHeader.classList.add('class-card-header');
  
        const className = document.createElement('p');
        className.classList.add('class-name');
        className.textContent = schedule.subname; // Subject Name
  
        const courseType = document.createElement('span');
        courseType.classList.add('course-type', schedule.type === 'Lab' ? 'lab' : 'theory');
        courseType.textContent = schedule.type || 'Theory'; // Theory or Lab
  
        classCardHeader.appendChild(className);
        classCardHeader.appendChild(courseType);
  
        // Class Details
        const classDetails = document.createElement('div');
        classDetails.classList.add('class-details');
  
        const classTime = document.createElement('p');
        classTime.classList.add('class-time');
        classTime.innerHTML = `<img src="../images/icons/time_icon.png" alt="Time Icon"> ${schedule.time}`; // Class Time
  
        const classLocation = document.createElement('p');
        classLocation.classList.add('class-location');
        classLocation.innerHTML = `<img src="../images/icons/room-no-icon.png" alt="Location Icon"> ${schedule.room || 'Room TBD'}`; // Room Number
  
        classDetails.appendChild(classTime);
        classDetails.appendChild(classLocation);
  
        // Append to class card
        classCard.appendChild(classCardHeader);
        classCard.appendChild(classDetails);
  
        // Append to the container
        classesListContainer.appendChild(classCard);
      });
    } catch (error) {
      console.error("Error fetching or populating schedule:", error);
    }
  }
  
  // Call the function with the appropriate student ID when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    const studentId = "1"; // Replace with dynamic student ID if available
    updateUserDetails();
    populateTodaysSchedule(studentId);
  });
  


// Update active menu item
function updateActiveMenu(activePage) {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelector(`.menu-item[onclick="loadPage('${activePage}')"]`).classList.add('active');
}
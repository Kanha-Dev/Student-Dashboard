// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAJ1fTjwfhHEnuCrR3bZy8WlmR1PLFSLt4",
    authDomain: "student-dashboard-93bc1.firebaseapp.com",
    projectId: "student-dashboard-93bc1",
    storageBucket: "student-dashboard-93bc1.appspot.com",
    messagingSenderId: "822859107487",
    appId: "1:822859107487:web:804cfa16725f65c794e6aa",
    measurementId: "G-NKSVW18S6J"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Handle Logout
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Sign out the user
    auth.signOut().then(() => {
        alert("Logged out successfully");
        window.location.href = "index.html";  // Redirect to login page
    }).catch((error) => {
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
    });
});
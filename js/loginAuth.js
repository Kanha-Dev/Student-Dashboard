// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";

// Your web app's Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize the auth object

const loginButton = document.getElementById('login-button');
loginButton.addEventListener("click", function (event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            alert("Signed in successfully");
            window.location.href = "home.html";
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert("Error: " + errorMessage);
        });
});
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js"; // Use the same version as the app
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

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
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore

// Sign Up Logic
const signupButton = document.getElementById('submit');
signupButton.addEventListener('click', async () => {
    const name = document.getElementById('name').value;
    const mobile = document.getElementById('mobile').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email domain
    if (!email.endsWith('@muj.manipal.edu')) {
        alert('Please use an email ending with @muj.manipal.edu');
        return;
    }

    try {
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional user information in Firestore
        await setDoc(doc(db, "users", user.uid), {
            name: name,
            mobile: mobile,
            email: email
        });

        alert("Signed up successfully");
        window.location.href = "home.html"; // Redirect after successful signup
    } catch (error) {
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
    }
});
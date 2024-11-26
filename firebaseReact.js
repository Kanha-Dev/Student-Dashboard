// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
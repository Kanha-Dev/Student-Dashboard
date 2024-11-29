// Get today's date
const today = new Date();

// Format the date as a string (e.g., "YYYY-MM-DD")
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
const day = String(today.getDate()).padStart(2, '0');

// Create a formatted date string
const dateString = `${year}-${month}-${day}`;

// Update the content of the paragraph with class 'date'
document.getElementById('today-date').textContent = `Today's Date: ${dateString}`;
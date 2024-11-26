Here’s the updated README.md to reflect the changes you requested:

Student Dashboard Project

This is a student dashboard project that allows students to access their details, attendance, timetable, and more. The application is powered by a Node.js backend with a MySQL database and a dynamic frontend built using HTML, CSS, and JavaScript.

Features

	•	Student Details: View personal and academic information.
	•	Timetable and Attendance: Track your timetable and attendance.
	•	Dynamic Menu Navigation: Seamlessly navigate through various sections of the dashboard.
	•	User Authentication: Integration with Firebase Authentication.
	•	Database Integration: MySQL database to fetch student data (like student ID based on email).

Technologies Used

	•	Frontend:
	•	HTML5
	•	CSS3
	•	JavaScript
	•	Firebase Authentication (for handling user login)
	•	Backend:
	•	Node.js
	•	Express.js
	•	MySQL
	•	Other Libraries:
	•	Body-Parser (to handle POST request bodies)
	•	CORS (to allow cross-origin requests)

Setup Instructions

Prerequisites

	1.	Node.js: You need Node.js installed on your machine. You can download it from Node.js official website.
	2.	MySQL Database: You must have a MySQL instance running and a database set up to store the student data. Ensure your database contains the necessary tables (like Student and User), and that it is accessible from the Node.js server.
	3.	Firebase Authentication: If using Firebase Authentication, set up your Firebase project and integrate the firebase JavaScript SDK.

Step 1: Clone the Repository

Clone the project repository to your local machine:

git clone https://github.com/yourusername/student-dashboard.git
cd student-dashboard

Step 2: Install Dependencies

Navigate to the project directory and install the necessary dependencies:

npm install

This will install the backend dependencies, including express, mysql, cors, etc.

Step 3: Setup the MySQL Database

	1.	Create a MySQL Database:
Ensure that you have a running MySQL database. Create a database called SchoolManagementSystem (or another name of your choice), and create tables as required.
	2.	Run the SQL Schema Script:
Navigate to the db folder in the project directory, where you’ll find a .sql file containing the schema and dummy data. You can run this script to create the necessary tables and populate them with dummy data.
Example MySQL commands to run:

source path/to/db/schema.sql;


	3.	Update Database Credentials:
In server.js, replace the database connection credentials with your actual MySQL database credentials (if necessary):

const con = mysql.createConnection({
  host: "localhost",          // Database host
  user: "root",               // Your database username
  password: "",               // Your database password
  database: "SchoolManagementSystem"  // Your database name
});

Step 4: Start the Backend Server

Once the dependencies are installed and the database is set up, start the server by running:

node server.js

By default, the server will run on http://localhost:3000.

Step 5: View the Frontend

For the frontend:
	1.	You can open the home.html file directly in your browser, or
	2.	Use a live server to view the frontend.

If you’re using Visual Studio Code, you can install the “Live Server” extension and use it to run the frontend locally.

API Endpoints

/api/student/:regNumber (GET)

	•	Description: Fetches student details based on the provided registration number (email).
	•	Request Parameters:
	•	regNumber (string): The email/registration number of the student.
	•	Response:

{
  "sid": 12345,
  "email": "student@example.com",
  "full_name": "Student Name",
  "other_details": "..."
}

Environment Variables

If you’re using environment variables for sensitive information like your MySQL password or others, create a .env file in the root directory and add the following variables:

DB_HOST=localhost
DB_USER=your-db-username
DB_PASSWORD=your-db-password
DB_NAME=SchoolManagementSystem

In your server.js, replace hardcoded values with process.env.VARIABLE_NAME.

For example:

const con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

To use the .env file, install the dotenv package:

npm install dotenv

And add the following line at the top of your server.js:

require('dotenv').config();

Troubleshooting

	•	CORS Issues: If you’re making requests from a different port (e.g., frontend on localhost:3000 and backend on localhost:5500), ensure you have added the cors middleware to your backend.
	•	Database Connection Errors: Double-check your MySQL connection credentials and ensure that the database server is running.

License

This project is licensed under the MIT License - see the LICENSE file for details.

Let me know if you need further updates or adjustments!
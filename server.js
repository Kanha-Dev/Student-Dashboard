const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "SchoolManagementSystem"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to the database!");
});

// API endpoint to get student data
app.get('/api/student/:regNumber', (req, res) => {
    const regNumber = req.params.regNumber;
    const query = `SELECT * FROM Student WHERE email = ?`;

    con.query(query, [regNumber], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(result[0]); // Send the first row of the result
        }
    });
});

// API endpoint to get student marks
app.get('/api/studentMarks/:regNumber', (req, res) => {
    const regNumber = req.params.regNumber;
    const query = `SELECT 
                    S.sid,
                    S.sname AS StudentName,
                    Sub.subid,
                    Sub.subject_name AS SubjectName,
                    M.MTE,
                    M.CWS,
                    M.ETE,
                    M.Total,
                    M.grade,
                    M.remarks
                FROM 
                    Student S
                JOIN 
                    RelationalTable_R2 R ON S.sid = R.sid
                JOIN 
                    Subject Sub ON R.subid = Sub.subid
                JOIN 
                    Marks M ON R.mid = M.mid
                WHERE 
                    S.sid = ?`;

    con.query(query, [regNumber], (err, result) => {
        if (err) {
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(result[0]); // Send the first row of the result
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

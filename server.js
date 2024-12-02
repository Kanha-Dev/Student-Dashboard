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
    password: "root",
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

app.get('/api/studentMarks/:regNumber', (req, res) => {
    const regNumber = req.params.regNumber;
    const query = `SELECT 
                    S.sid,
                    S.sname AS StudentName,
                    Sub.subid AS SubjectId,
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
            res.json(result); // Send the result (array of subjects with marks data)
        }
    });
});

// API endpoint to get today's schedule based on sid
app.get('/api/todaysSchedule/:sid', (req, res) => {
    const sid = req.params.sid;
    // const today = new Date().toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
    const today = '2024-11-01'; // For testing purposes

    const query = `
SELECT 
    p.pid,
    s.subject_name AS subname,
    p.time,
    p.date
FROM 
    Period p
NATURAL JOIN 
    RelationalTable_R4 r4
NATURAL JOIN 
    RelationalTable_R3 r3
NATURAL JOIN 
    Subject s
WHERE 
    r3.sid = ?
    AND p.date = ?;
    `;

    con.query(query, [sid,today], (err, result) => {
        if (err) {
            console.error("Error executing query: ", err);
            res.status(500).json({ error: "Database query failed" });
        } else {
            res.json(result);
        }
    });
});

// API to retrieve attendance data for a specific student and subject
app.get('/api/attendance/:student_id/:subject_id', (req, res) => {
    const studentId = req.params.student_id;
    const subjectId = req.params.subject_id;

    const query = `
SELECT 
    sub.subject_name,
    COUNT(CASE WHEN a.present = TRUE THEN 1 END) AS present_count,
    COUNT(CASE WHEN a.absent = TRUE THEN 1 END) AS absent_count
FROM 
    Student s
JOIN 
    RelationalTable_R3 r3 ON s.sid = r3.sid
JOIN 
    RelationalTable_R4 r4 ON r3.aid = r4.aid
JOIN 
    Period p ON r4.pid = p.pid
JOIN 
    Subject sub ON p.subid = sub.subid
JOIN 
    Attendance a ON r3.aid = a.aid
WHERE 
    s.sid = ?  -- Replace with the actual student ID
    AND sub.subid = ?  -- Replace with the actual subject ID
GROUP BY 
    sub.subject_name;
    `;

    con.query(query, [studentId, subjectId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'No attendance data found for the given student and subject.' });
            return;
        }

        res.status(200).json({ attendance: results[0] });
    });
});

app.get('/api/subject/:subjectId', (req, res) => {
    const subjectId = req.params.subjectId;
    const query = `
        SELECT 
            subject_name
        FROM 
            Subject
        WHERE 
            subid = ?;`;

    con.query(query, [subjectId], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal server error' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ message: 'No subject found for the given ID.' });
            return;
        }

        res.status(200).json({ subject_name: results[0].subject_name });
    });
});

  

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

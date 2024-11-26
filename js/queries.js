const db = require('./db');

// Fetch all users
async function getAllUsers() {
    try {
        const [rows] = await db.query('SELECT * FROM User');
        return rows;
    } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
    }
}

// Fetch a student by ID
async function getStudentById(studentId) {
    try {
        const [rows] = await db.query(
            'SELECT * FROM Student WHERE S_id = ?',
            [studentId]
        );
        return rows[0];
    } catch (err) {
        console.error('Error fetching student:', err);
        throw err;
    }
}

// Add a new user
async function addUser({ role, name, email, mobile, password }) {
    try {
        const [result] = await db.query(
            'INSERT INTO User (Role, Name, Email, Mobile, Password) VALUES (?, ?, ?, ?, ?)',
            [role, name, email, mobile, password]
        );
        return result.insertId;
    } catch (err) {
        console.error('Error adding user:', err);
        throw err;
    }
}

// Fetch attendance for a student
async function getAttendanceByStudent(studentId) {
    try {
        const [rows] = await db.query(
            `SELECT A.*, P.Start_time, P.End_time, Sub.Name AS Subject
             FROM Attendance A
             JOIN Period P ON A.Period_id = P.Period_id
             JOIN Subject Sub ON P.Sub_id = Sub.Sub_id
             WHERE A.S_id = ?`,
            [studentId]
        );
        return rows;
    } catch (err) {
        console.error('Error fetching attendance:', err);
        throw err;
    }
}

// Fetch club details for a student
async function getClubsByStudent(studentId) {
    try {
        const [rows] = await db.query(
            `SELECT C.*
             FROM ExecCommittee EC
             JOIN Club C ON EC.Club_id = C.Club_id
             WHERE EC.S_id = ?`,
            [studentId]
        );
        return rows;
    } catch (err) {
        console.error('Error fetching clubs:', err);
        throw err;
    }
}

module.exports = {
    getAllUsers,
    getStudentById,
    addUser,
    getAttendanceByStudent,
    getClubsByStudent,
};
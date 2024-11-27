-- DATABASE CREATION
CREATE DATABASE SchoolManagementSystem;
USE SchoolManagementSystem;

-- TABLE CREATION
-- Department
CREATE TABLE Department (
    depid INT PRIMARY KEY,
    school_name VARCHAR(100),
    semester INT NOT NULL
);

-- Class
CREATE TABLE Class (
    classid INT PRIMARY KEY,
    depid INT NOT NULL,
    fid INT,
    section VARCHAR(5),
    FOREIGN KEY (depid) REFERENCES Department(depid)
);

-- Faculty Personal Details
CREATE TABLE Faculty (
    fid INT PRIMARY KEY,
    fname VARCHAR(100) NOT NULL,
    qualification_degree VARCHAR(100),
    qualification_year_of_passing YEAR,
    college VARCHAR(255),
    research TEXT,
    patent TEXT,
    publication TEXT,
    specialization VARCHAR(100),
    position VARCHAR(50),
    depid INT NOT NULL,
    cabin VARCHAR(50),
    FOREIGN KEY (depid) REFERENCES Department(depid)
);

-- Student Personal Details
CREATE TABLE Student (
    sid INT PRIMARY KEY,
    sname VARCHAR(100) NOT NULL,
    mob VARCHAR(15),
    email VARCHAR(100),
    permanent_address TEXT,
    current_address TEXT,
    guardian_name VARCHAR(100),
    guardian_mob_no VARCHAR(15),
    guardian_email VARCHAR(100),
    aadhar_card VARCHAR(20),
    depid INT NOT NULL,
    classid INT NOT NULL,
    FOREIGN KEY (depid) REFERENCES Department(depid),
    FOREIGN KEY (classid) REFERENCES Class(classid)
);

-- Executive Committee
CREATE TABLE ExecutiveCommittee (
    execid INT PRIMARY KEY,
    position VARCHAR(50) NOT NULL,
    sid INT NOT NULL,
    date_joined DATE,
    responsibilities TEXT,
    FOREIGN KEY (sid) REFERENCES Student(sid)
);

-- Club
CREATE TABLE Club (
    cid INT PRIMARY KEY,
    execid INT,
    fid INT,
    FOREIGN KEY (execid) REFERENCES ExecutiveCommittee(execid),
    FOREIGN KEY (fid) REFERENCES Faculty(fid)
);

-- Event
CREATE TABLE Event (
    eid INT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    date DATE NOT NULL,
    cid INT NOT NULL,
    FOREIGN KEY (cid) REFERENCES Club(cid)
);

-- Subject
CREATE TABLE Subject (
    subid INT PRIMARY KEY,
    depid INT NOT NULL,
    FOREIGN KEY (depid) REFERENCES Department(depid)
);

-- Attendance
CREATE TABLE Attendance (
    aid INT PRIMARY KEY,
    present INT,
    absent INT,
    not_considered INT
);

-- Period
CREATE TABLE Period (
    pid INT PRIMARY KEY,
    time TIME NOT NULL,
    date DATE NOT NULL,
    duration INT NOT NULL, -- Duration in minutes
    subid INT NOT NULL,
    FOREIGN KEY (subid) REFERENCES Subject(subid)
);

-- Fees
CREATE TABLE Fees (
    feeid INT PRIMARY KEY,
    depid INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (depid) REFERENCES Department(depid)
);

-- Transaction
CREATE TABLE Transaction (
    transacid INT PRIMARY KEY,
    sid INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (sid) REFERENCES Student(sid)
);

-- Finance
CREATE TABLE Finance (
    finid INT PRIMARY KEY,
    sid INT NOT NULL,
    feeid INT NOT NULL,
    due DECIMAL(10, 2),
    paid_on DATE,
    status ENUM('pending', 'paid', 'partial') NOT NULL,
    FOREIGN KEY (sid) REFERENCES Student(sid),
    FOREIGN KEY (feeid) REFERENCES Fees(feeid)
);

-- Assignment
CREATE TABLE Assignment (
    assignmentid INT PRIMARY KEY,
    subid INT NOT NULL,
    file VARCHAR(255),
    submission_date DATE,
    deadline DATE,
    FOREIGN KEY (subid) REFERENCES Subject(subid)
);

-- Marks
CREATE TABLE Marks (
    mid INT PRIMARY KEY,
    MTE INT,
    CWS INT,
    ETE INT,
    Total INT AS (MTE + CWS + ETE) , 
    grade VARCHAR(2),
    remarks VARCHAR(255)
);
-- Relational Table R1
CREATE TABLE RelationalTable_R1 (
    subid INT,
    fid INT,
    classid INT,
    PRIMARY KEY (subid, fid, classid),
    FOREIGN KEY (subid) REFERENCES Subject(subid),
    FOREIGN KEY (fid) REFERENCES Faculty(fid),
    FOREIGN KEY (classid) REFERENCES Class(classid)
);

-- Relational Table R2
CREATE TABLE RelationalTable_R2 (
    sid INT,
    subid INT,
    mid INT,
    PRIMARY KEY (sid, subid, mid),
    FOREIGN KEY (sid) REFERENCES Student(sid),
    FOREIGN KEY (subid) REFERENCES Subject(subid),
    FOREIGN KEY (mid) REFERENCES Marks(mid)
);

-- Relational Table R3
CREATE TABLE RelationalTable_R3 (
    sid INT,
    subid INT,
    aid INT,
    PRIMARY KEY (sid, subid, aid),
    FOREIGN KEY (sid) REFERENCES Student(sid),
    FOREIGN KEY (subid) REFERENCES Subject(subid),
    FOREIGN KEY (aid) REFERENCES Attendance(aid)
);

-- Relational Table R4
CREATE TABLE RelationalTable_R4 (
    classid INT,
    pid INT,
    aid INT,
    PRIMARY KEY (classid, pid, aid),
    FOREIGN KEY (classid) REFERENCES Class(classid),
    FOREIGN KEY (pid) REFERENCES Period(pid),
    FOREIGN KEY (aid) REFERENCES Attendance(aid)
);

-- Relational Table R5
CREATE TABLE RelationalTable_R5 (
    subid INT,
    classid INT,
    pid INT,
    PRIMARY KEY (subid, classid, pid),
    FOREIGN KEY (subid) REFERENCES Subject(subid),
    FOREIGN KEY (classid) REFERENCES Class(classid),
    FOREIGN KEY (pid) REFERENCES Period(pid)
);

-- Club-Events Relation
CREATE TABLE ClubEvents (
    club_id INT,
    event_id INT,
    PRIMARY KEY (club_id, event_id),
    FOREIGN KEY (club_id) REFERENCES Club(cid),
    FOREIGN KEY (event_id) REFERENCES Event(eid)
);

-- Subject-Semester Relation
CREATE TABLE SubjectSemester (
    subid INT,
    semester INT,
    PRIMARY KEY (subid, semester),
    FOREIGN KEY (subid) REFERENCES Subject(subid)
);

-- Detailed Attendance
CREATE TABLE DetailedAttendance (
    aid INT,
    sid INT,
    pid INT,
    status ENUM('present', 'absent', 'not considered'),
    PRIMARY KEY (aid, sid, pid),
    FOREIGN KEY (aid) REFERENCES Attendance(aid),
    FOREIGN KEY (sid) REFERENCES Student(sid),
    FOREIGN KEY (pid) REFERENCES Period(pid)
);

-- Student-Club Membership
CREATE TABLE ClubMembership (
    sid INT,
    cid INT,
    PRIMARY KEY (sid, cid),
    FOREIGN KEY (sid) REFERENCES Student(sid),
    FOREIGN KEY (cid) REFERENCES Club(cid)
);

-- Assignment-Class Relation
CREATE TABLE AssignmentClass (
    assignmentid INT,
    classid INT,
    PRIMARY KEY (assignmentid, classid),
    FOREIGN KEY (assignmentid) REFERENCES Assignment(assignmentid),
    FOREIGN KEY (classid) REFERENCES Class(classid)
);

INSERT INTO Department (depid, school_name, semester) VALUES
(1, 'Computer Science', 6),
(2, 'Electronics and Communication', 6),
(3, 'Mechanical Engineering', 6),
(4, 'Civil Engineering', 6),
(5, 'Electrical Engineering', 6);

INSERT INTO Faculty (fid, fname, qualification_degree, qualification_year_of_passing, college, research, patent, publication, specialization, position, depid, cabin) VALUES
(1, 'Dr. Anil Sharma', 'PhD in Computer Science', 2015, 'IIT Delhi', 'Artificial Intelligence, Machine Learning', 'Patent on AI-based system for medical diagnosis', 'Research papers on AI and Data Science', 'AI, ML, Data Science', 'Associate Professor', 1, 'C1'),
(2, 'Dr. Neeta Verma', 'PhD in Electronics', 2013, 'NIT Trichy', 'Wireless Communication, Signal Processing', 'Patent on wireless communication systems', 'Research on communication networks', 'Signal Processing, Communication', 'Professor', 2, 'C2'),
(3, 'Prof. Rajesh Kumar', 'MSc in Physics', 2010, 'University of Delhi', 'Quantum Computing, Nanotechnology', 'No patents', 'Publications on Nanotechnology in Physics journals', 'Quantum Computing, Nanotechnology', 'Assistant Professor', 3, 'C3'),
(4, 'Dr. Priya Reddy', 'PhD in Civil Engineering', 2017, 'IIT Bombay', 'Structural Engineering, Building Materials', 'Patent on eco-friendly construction materials', 'Research papers on sustainable building materials', 'Structural Engineering, Building Materials', 'Assistant Professor', 4, 'C4'),
(5, 'Dr. Vinayak Joshi', 'PhD in Electrical Engineering', 2012, 'NIT Surathkal', 'Power Systems, Smart Grids', 'Patent on smart grid technology', 'Publications on power distribution systems', 'Power Systems, Smart Grids', 'Associate Professor', 5, 'C5');

INSERT INTO Class (classid, depid, fid, section) VALUES
(1, 1, 101, 'A'),
(2, 1, 102, 'B'),
(3, 2, 103, 'A'),
(4, 3, 104, 'A'),
(5, 4, 105, 'A');

INSERT INTO Student (sid, sname, mob, email, permanent_address, current_address, guardian_name, guardian_mob_no, guardian_email, aadhar_card, depid, classid) VALUES
(1, 'Arjun Mehta', '9876543210', 'arjun.mehta@example.com', '123 Green Avenue, Delhi', '45 Blue Street, Noida', 'Rakesh Mehta', '9876543211', 'rakesh.mehta@example.com', '1234-5678-9012', 1, 1),
(2, 'Neha Sharma', '8765432190', 'neha.sharma@example.com', '56 Red Lane, Mumbai', '78 Yellow Circle, Pune', 'Suresh Sharma', '8765432191', 'suresh.sharma@example.com', '2345-6789-0123', 1, 2),
(3, 'Vikas Kumar', '7654321980', 'vikas.kumar@example.com', '98 Purple Colony, Bangalore', '23 Orange Plaza, Mysore', 'Rajesh Kumar', '7654321981', 'rajesh.kumar@example.com', '3456-7890-1234', 2, 3),
(4, 'Pooja Singh', '6543219870', 'pooja.singh@example.com', '67 Greenfield, Jaipur', '90 Blue Valley, Jodhpur', 'Mahesh Singh', '6543219871', 'mahesh.singh@example.com', '4567-8901-2345', 3, 4),
(5, 'Rohit Verma', '5432198760', 'rohit.verma@example.com', '34 Sunrise Apartments, Chandigarh', '56 Sunset Road, Shimla', 'Vinod Verma', '5432198761', 'vinod.verma@example.com', '5678-9012-3456', 4, 5);

INSERT INTO Subject (subid, depid) VALUES
(2130, 1), -- Software Engineering
(2131, 1), -- Cryptography and Technology
(2132, 1), -- Design and Analysis of Algorithms
(2133, 1), -- Foundation of Data Science
(2314, 1); -- Web Programming

INSERT INTO Marks (mid, MTE, CWS, ETE, grade, remarks) VALUES
(1, 25, 20, 45, 'A', 'Excellent performance'),
(2, 18, 15, 35, 'B', 'Good effort, scope for improvement'),
(3, 20, 10, 30, 'C', 'Needs more practice'),
(4, 22, 18, 40, 'B', 'Consistent work, keep it up'),
(5, 28, 25, 50, 'A', 'Outstanding performance'),
(6, 15, 10, 25, 'D', 'Below average, requires significant improvement'),
(7, 19, 12, 32, 'C', 'Fair work, but needs focus'),
(8, 24, 20, 46, 'A', 'Great effort and understanding'),
(9, 21, 18, 39, 'B', 'Steady progress, good understanding'),
(10, 16, 14, 28, 'C', 'Average performance, needs improvement');

-- For Student 1 (Arjun Mehta)
INSERT INTO RelationalTable_R2 (sid, subid, mid) VALUES
(1, 2130, 1), -- Software Engineering
(1, 2131, 2), -- Cryptography and Technology
(1, 2132, 3), -- Design and Analysis of Algorithms
(1, 2133, 4), -- Foundation of Data Science
(1, 2314, 5); -- Web Programming

-- For Student 2 (Neha Sharma)
INSERT INTO RelationalTable_R2 (sid, subid, mid) VALUES
(2, 2130, 6), -- Software Engineering
(2, 2131, 7), -- Cryptography and Technology
(2, 2132, 8), -- Design and Analysis of Algorithms
(2, 2133, 9), -- Foundation of Data Science
(2, 2314, 10); -- Web Programming

ALTER TABLE Subject
ADD subject_name VARCHAR(255) NOT NULL;

UPDATE Subject
SET subject_name = CASE subid
    WHEN 2130 THEN 'Software Engineering'
    WHEN 2131 THEN 'Cryptography and Technology'
    WHEN 2132 THEN 'Design and Analysis of Algorithms'
    WHEN 2133 THEN 'Foundation of Data Science'
    WHEN 2314 THEN 'Web Programming'
    ELSE subject_name
END;

ALTER TABLE Attendance
DROP COLUMN present;

ALTER TABLE Attendance
DROP COLUMN absent;

ALTER TABLE Attendance
ADD present BOOLEAN NOT NULL,
ADD absent BOOLEAN NOT NULL;

-- Updated Attendance Records (Each row is for one period of a subject)
INSERT INTO Attendance (aid, present, absent, not_considered) VALUES
(1, TRUE, FALSE, 0),
(2, TRUE, FALSE, 0),
(3, FALSE, TRUE, 0),
(4, TRUE, FALSE, 0),
(5, TRUE, FALSE, 0),

(6, FALSE, TRUE, 0),
(7, TRUE, FALSE, 0),
(8, TRUE, FALSE, 0),
(9, TRUE, FALSE, 0),
(10, FALSE, TRUE, 1),

(11, TRUE, FALSE, 0),
(12, TRUE, FALSE, 0),
(13, FALSE, TRUE, 0),
(14, TRUE, FALSE, 0),
(15, TRUE, FALSE, 0),

(16, FALSE, TRUE, 0),
(17, TRUE, FALSE, 0),
(18, TRUE, FALSE, 0),
(19, TRUE, FALSE, 0),
(20, FALSE, TRUE, 1);

-- For Student 1 (sid = 1)
INSERT INTO RelationalTable_R3 (sid, subid, aid) VALUES
(1, 2130, 1), (1, 2130, 2), (1, 2130, 3), (1, 2130, 4), (1, 2130, 5), -- Software Engineering
(1, 2131, 6), (1, 2131, 7), (1, 2131, 8), (1, 2131, 9), (1, 2131, 10), -- Cryptography and Technology
(1, 2132, 11), (1, 2132, 12), (1, 2132, 13), (1, 2132, 14), (1, 2132, 15), -- Design and Analysis of Algorithms
(1, 2133, 16), (1, 2133, 17), (1, 2133, 18), (1, 2133, 19), (1, 2133, 20); -- Foundation of Data Science

-- For Student 2 (sid = 2)
INSERT INTO RelationalTable_R3 (sid, subid, aid) VALUES
(2, 2130, 1), (2, 2130, 2), (2, 2130, 3), (2, 2130, 4), (2, 2130, 5), -- Software Engineering
(2, 2131, 6), (2, 2131, 7), (2, 2131, 8), (2, 2131, 9), (2, 2131, 10), -- Cryptography and Technology
(2, 2132, 11), (2, 2132, 12), (2, 2132, 13), (2, 2132, 14), (2, 2132, 15), -- Design and Analysis of Algorithms
(2, 2133, 16), (2, 2133, 17), (2, 2133, 18), (2, 2133, 19), (2, 2133, 20); -- Foundation of Data Science

-- For Class 1 (classid = 1)
INSERT INTO RelationalTable_R4 (classid, pid, aid) VALUES
-- Software Engineering (subid: 2130)
(1, 1, 1), 
(1, 2, 2), 
(1, 3, 3), 
(1, 4, 4), 
(1, 5, 5),

-- Cryptography and Technology (subid: 2131)
(1, 6, 6), 
(1, 7, 7), 
(1, 8, 8), 
(1, 9, 9), 
(1, 10, 10),

-- Design and Analysis of Algorithms (subid: 2132)
(1, 11, 11), 
(1, 12, 12), 
(1, 13, 13), 
(1, 14, 14), 
(1, 15, 15),

-- Foundation of Data Science (subid: 2133)
(1, 16, 16), 
(1, 17, 17), 
(1, 18, 18), 
(1, 19, 19), 
(1, 20, 20);

INSERT INTO Period (pid, time, date, duration, subid) VALUES
-- Software Engineering (subid: 2130)
(1, '09:00:00', '2024-11-01', 60, 2130),
(2, '09:00:00', '2024-11-02', 60, 2130),
(3, '09:00:00', '2024-11-03', 60, 2130),
(4, '09:00:00', '2024-11-04', 60, 2130),
(5, '09:00:00', '2024-11-05', 60, 2130),

-- Cryptography and Technology (subid: 2131)
(6, '10:00:00', '2024-11-01', 60, 2131),
(7, '10:00:00', '2024-11-02', 60, 2131),
(8, '10:00:00', '2024-11-03', 60, 2131),
(9, '10:00:00', '2024-11-04', 60, 2131),
(10, '10:00:00', '2024-11-05', 60, 2131),

-- Design and Analysis of Algorithms (subid: 2132)
(11, '11:00:00', '2024-11-01', 60, 2132),
(12, '11:00:00', '2024-11-02', 60, 2132),
(13, '11:00:00', '2024-11-03', 60, 2132),
(14, '11:00:00', '2024-11-04', 60, 2132),
(15, '11:00:00', '2024-11-05', 60, 2132),

-- Foundation of Data Science (subid: 2133)
(16, '12:00:00', '2024-11-01', 60, 2133),
(17, '12:00:00', '2024-11-02', 60, 2133),
(18, '12:00:00', '2024-11-03', 60, 2133),
(19, '12:00:00', '2024-11-04', 60, 2133),
(20, '12:00:00', '2024-11-05', 60, 2133),

-- Web Programming (subid: 2314)
(21, '13:00:00', '2024-11-01', 60, 2314),
(22, '13:00:00', '2024-11-02', 60, 2314),
(23, '13:00:00', '2024-11-03', 60, 2314),
(24, '13:00:00', '2024-11-04', 60, 2314),
(25, '13:00:00', '2024-11-05', 60, 2314);

SELECT * FROM Attendance;

        SELECT 
            p.pid,
            s.subject_name AS subname,
            p.time,
            p.date
        FROM 
            RelationalTable_R3 r3
        JOIN 
            Subject s ON r3.subid = s.subid
        JOIN 
            RelationalTable_R4 r4 ON r3.aid = r4.aid
        JOIN 
            Period p ON r4.pid = p.pid
        WHERE 
            r3.sid = 1
            AND p.date = '2024-11-01';
            
            
SELECT 
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
    s.sid = 1  -- Replace with the student ID
    AND sub.subid = 2131;  -- Replace with the subject ID

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
    s.sid = 1
    AND sub.subid = 2130
GROUP BY 
    sub.subject_name;
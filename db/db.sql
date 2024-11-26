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

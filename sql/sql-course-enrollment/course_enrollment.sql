-- Online Course Enrollment System

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(50),
    email VARCHAR(50)
);

CREATE TABLE courses (
    course_id INT PRIMARY KEY,
    course_name VARCHAR(50),
    instructor VARCHAR(50)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

INSERT INTO students VALUES
(1, 'Jeba', 'jeba@gmail.com'),
(2, 'Asha', 'asha@gmail.com'),
(3, 'Ravi', 'ravi@gmail.com');

INSERT INTO courses VALUES
(101, 'Java Basics', 'Mr. Kumar'),
(102, 'SQL Fundamentals', 'Ms. Priya'),
(103, 'Web Development', 'Mr. Arjun');

INSERT INTO enrollments VALUES
(1001, 1, 101, '2026-02-01'),
(1002, 1, 102, '2026-02-02'),
(1003, 2, 103, '2026-01-30'),
(1004, 3, 101, '2026-01-28');

-- View all students
SELECT * FROM students;

-- View all courses
SELECT * FROM courses;

-- Show student enrollments
SELECT s.student_name, c.course_name
FROM students s
JOIN enrollments e ON s.student_id = e.student_id
JOIN courses c ON e.course_id = c.course_id;

-- Count students per course
SELECT c.course_name, COUNT(e.student_id) AS total_students
FROM courses c
LEFT JOIN enrollments e ON c.course_id = e.course_id
GROUP BY c.course_name;
 --Sort enrollments by date
SELECT * FROM enrollments
ORDER BY enrollment_date DESC;

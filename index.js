const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Sample student data
const students = [
    { student_id: "1", name: "Alice Johnson", marks: { math: 85, science: 90, english: 78, history: 88, geography: 92 }, total: 433 },
    { student_id: "2", name: "Bob Smith", marks: { math: 75, science: 80, english: 85, history: 70, geography: 100 }, total: 410 },
    { student_id: "3", name: "Charlie Davis", marks: { math: 82, science: 85, english: 80, history: 83, geography: 85 }, total: 415 },
    { student_id: "4", name: "David Brown", marks: { math: 60, science: 65, english: 70, history: 75, geography: 80 }, total: 350 }
];

// API Endpoint
app.post('/students/above-threshold', (req, res) => {
    const { threshold } = req.body;
    
    // Input validation
    if (typeof threshold !== 'number' || threshold < 0) {
        return res.status(400).json({ error: "Invalid threshold value. It must be a positive number." });
    }

    // Filter students based on threshold
    const filteredStudents = students.filter(student => student.total > threshold)
                                     .map(student => ({ name: student.name, total: student.total }));
    
    res.json({ count: filteredStudents.length, students: filteredStudents });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

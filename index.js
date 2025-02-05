const express = require('express');
const bodyParser = require('body-parser');
const { data } = require('react-router-dom');

const app = express();
app.use(bodyParser.json());

// Sample student data
const students = data

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

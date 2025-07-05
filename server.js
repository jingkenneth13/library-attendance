const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock database
let attendanceDB = [];
let studentsDB = [
    { id: '1001', name: 'John Doe' },
    { id: '1002', name: 'Jane Smith' },
    { id: '1003', name: 'Robert Johnson' },
    { id: '1004', name: 'Emily Davis' },
    { id: '1005', name: 'Michael Brown' }
];

// API Routes
app.get('/api/attendance', (req, res) => {
    res.json(attendanceDB);
});

app.post('/api/attendance', (req, res) => {
    const { barcode } = req.body;
    const student = studentsDB.find(s => s.id === barcode);
    
    if (!student) {
        return res.json({ success: false, message: 'Student not found' });
    }
    
    const record = {
        ...student,
        timeIn: new Date().toISOString()
    };
    
    attendanceDB.push(record);
    res.json({ success: true, student: record });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

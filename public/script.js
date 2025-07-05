document.addEventListener('DOMContentLoaded', function() {
    const barcodeInput = document.getElementById('barcode-input');
    const submitBtn = document.getElementById('submit-attendance');
    const attendanceBody = document.getElementById('attendance-body');
    
    submitBtn.addEventListener('click', submitAttendance);
    barcodeInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            submitAttendance();
        }
    });
    
    function submitAttendance() {
        const barcode = barcodeInput.value.trim();
        if (!barcode) return;
        
        // In a real system, you would send this to your backend
        // For this demo, we'll simulate it
        fetch('/api/attendance', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ barcode })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                addAttendanceRecord(data.student);
                barcodeInput.value = '';
            } else {
                alert(data.message || 'Error recording attendance');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to record attendance');
        });
    }
    
    function addAttendanceRecord(student) {
        const row = document.createElement('tr');
        
        const idCell = document.createElement('td');
        idCell.textContent = student.id;
        
        const nameCell = document.createElement('td');
        nameCell.textContent = student.name;
        
        const timeCell = document.createElement('td');
        timeCell.textContent = new Date().toLocaleTimeString();
        
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(timeCell);
        
        attendanceBody.prepend(row);
    }
    
    // Load initial attendance data
    fetch('/api/attendance')
    .then(response => response.json())
    .then(data => {
        data.forEach(student => {
            addAttendanceRecord(student);
        });
    });
});

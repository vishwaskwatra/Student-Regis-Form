document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const studentRecordsTable = document.getElementById('studentRecords').getElementsByTagName('tbody')[0];

    // Add a hidden input to keep track of the index being edited
    const editIndexInput = document.createElement('input');
    editIndexInput.type = 'hidden';
    editIndexInput.id = 'editIndex';
    form.appendChild(editIndexInput);

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        // Capture form data
        const formData = {
            firstName: document.getElementById('fname').value,
            surName: document.getElementById('sname').value,
            studentId: document.getElementById('S_id').value,
            class: document.getElementById('class').value,
            rollNumber: document.getElementById('Rno').value,
            emailId: document.getElementById('email').value,
            contactNo: document.getElementById('contact').value
        };

        // Check for blank fields
        for (let key in formData) {
            if (formData[key] === "") {
                alert(`Please enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return; // Exit the function to prevent further execution
            }
        }

        // Store form data in local storage
        let students = JSON.parse(localStorage.getItem('students')) || [];
        const editIndex = editIndexInput.value;

        if (editIndex === "") {
            students.push(formData);
        } else {
            // Edit existing record
            students[editIndex] = formData;
            editIndexInput.value = "";
        }

        localStorage.setItem('students', JSON.stringify(students));

        // Refresh the table
        studentRecordsTable.innerHTML = ""; // clear the table body
        displayStudentRecords(); // re-display all records

        form.reset();

        console.log('Form Data Captured:', formData);
    });

    function addRowToTable(student, index) {
        const newRow = studentRecordsTable.insertRow();
        newRow.innerHTML = `
            <td>${student.firstName}</td>
            <td>${student.surName}</td>
            <td>${student.studentId}</td>
            <td>${student.class}</td>
            <td>${student.rollNumber}</td>
            <td>${student.emailId}</td>
            <td>${student.contactNo}</td>
            <td>
                <button class="edit-btn" data-index="${index}"><i class="fas fa-edit"></i></button>
                <button class="delete-btn" data-index="${index}"><i class="fas fa-trash"></i></button>
            </td>
        `;
        
        // Add event listeners for edit and delete buttons
        newRow.querySelector('.edit-btn').addEventListener('click', function() {
            editRecord(index);
        });
        newRow.querySelector('.delete-btn').addEventListener('click', function() {
            deleteRecord(index);
        });
    }

    function displayStudentRecords() {
        const students = JSON.parse(localStorage.getItem('students')) || [];

        students.forEach((student, index) => {
            addRowToTable(student, index);
        });
    }

    function editRecord(index) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const student = students[index];
        document.getElementById('fname').value = student.firstName;
        document.getElementById('sname').value = student.surName;
        document.getElementById('S_id').value = student.studentId;
        document.getElementById('class').value = student.class;
        document.getElementById('Rno').value = student.rollNumber;
        document.getElementById('email').value = student.emailId;
        document.getElementById('contact').value = student.contactNo;
        editIndexInput.value = index;
    }

    function deleteRecord(index) {
        let students = JSON.parse(localStorage.getItem('students')) || [];
        students.splice(index, 1); // remove the student from the array
        localStorage.setItem('students', JSON.stringify(students)); // update local storage

        // refresh the table
        studentRecordsTable.innerHTML = "";
        displayStudentRecords(); // re-display all records
    }

    // call displayStudentRecords function to show records on page load
    displayStudentRecords();
});

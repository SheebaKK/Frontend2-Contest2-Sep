
    let students_data = []; // Initialize an empty array to store student data

    //fetch data from given json file by using fetch url method
    fetch('https://gist.githubusercontent.com/harsh3195/b441881e0020817b84e34d27ba448418/raw/c4fde6f42310987a54ae1bc3d9b8bfbafac15617/demo-json-data.json')
        .then(response => response.json())
        .then(data => {
            students_data = data; // store data into another array for further use
            displayTable(students_data); //Displaying all data on the table 
        })
        .catch(error => console.error('Error fetching data:', error));

    // Function to display student data
    function displayTable(students) {
        const tableBody = document.getElementById("tbody");
        tableBody.innerHTML = ''; // Clear existing data
    
        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.id}</td>
                <td>
                    <img src=${student.img_src} alt="Student Image" width="25">
                    ${student.first_name} ${student.last_name}
                </td>
                <td>${student.gender}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Sorting functionality
    function sortStudentsByFullName(order) {
        students_data.sort((a, b) => {
            const fullNameA = `${a.first_name} ${a.last_name}`;
            const fullNameB = `${b.first_name} ${b.last_name}`;
            return order === 'asc' ? fullNameA.localeCompare(fullNameB) : fullNameB.localeCompare(fullNameA);
        });
        displayTable(students_data);
    }

    function sortStudentsByMarks() {
        students_data.sort((a, b) => a.marks - b.marks);
        displayTable(students_data);
    }

    function sortStudentsByPassing() {
        const passingStudents = students_data.filter(student => student.passing);
        displayTable(passingStudents);
    }

    function sortStudentsByClass() {
        students_data.sort((a, b) => a.class - b.class);
        displayTable(students_data);
    }

    function sortStudentsByGender() {
        // Separate male and female students
        const maleStudents = students_data.filter(student => student.gender.toLowerCase() === 'male');
        const femaleStudents = students_data.filter(student => student.gender.toLowerCase() === 'female');
        
        // Display both tables (male and female) one below the other
        const combinedStudents = [...maleStudents, ...femaleStudents];
        displayTable(combinedStudents);
    }

    // Event listeners for sorting buttons
    document.getElementById('a-z').addEventListener('click', () => sortStudentsByFullName('asc'));
    document.getElementById('z-a').addEventListener('click', () => sortStudentsByFullName('desc'));
    document.getElementById('s-marks').addEventListener('click', sortStudentsByMarks);
    document.getElementById('s-passing').addEventListener('click', sortStudentsByPassing);
    document.getElementById('s-class').addEventListener('click', sortStudentsByClass);
    document.getElementById('s-gender').addEventListener('click', sortStudentsByGender);

    // Search functionality
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-btn');
    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredStudents = students_data.filter(student =>
            student.first_name.toLowerCase().includes(searchTerm) ||
            student.last_name.toLowerCase().includes(searchTerm) ||
            student.email.toLowerCase().includes(searchTerm) ||
            (student.first_name+ ' ' + student.last_name).toLowerCase().includes(searchTerm)
        );
        displayTable(filteredStudents);
    });

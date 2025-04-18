// Fetch data from the PostgreSQL database
function fetchGradeData() {
    console.log("Fetching grade data...");

    let xhr = new XMLHttpRequest();
    let apiRoute = "/api/grades";

    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades. Status: ${xhr.status}`);
                return;
            }

            try {
                const data = JSON.parse(xhr.responseText);
                populateGradebook(data);
            } catch (e) {
                console.error("Error parsing JSON response:", e);
            }
        }
    };

    xhr.open("GET", apiRoute, true);
    xhr.send();
}

// Populate the table with grade data
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);
    
    let tableBody = document.querySelector("#gradebook tbody");
    tableBody.innerHTML = ""; // Clear previous rows

    data.forEach(assignment => {
        let row = document.createElement("tr");

        // Student Name column
        let nameCell = document.createElement("td");
        nameCell.textContent = `${assignment.last_name}, ${assignment.first_name}`;
        row.appendChild(nameCell);

        // Assignment Grades (adjust depending on how data is structured)
        let assignment1 = document.createElement("td");
        assignment1.textContent = assignment.assignment_1 ?? "-";
        row.appendChild(assignment1);

        let assignment2 = document.createElement("td");
        assignment2.textContent = assignment.assignment_2 ?? "-";
        row.appendChild(assignment2);

        let assignment3 = document.createElement("td");
        assignment3.textContent = assignment.assignment_3 ?? "-";
        row.appendChild(assignment3);

        tableBody.appendChild(row);
    });
}

// Run when page loads
window.onload = () => {
    fetchGradeData();
};

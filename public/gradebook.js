// Fetch data from the PostgreSQL database
function fetchGradeData() {
    console.log("Fetching grade data...");

    // Create a new request for HTTP data
    let xhr = new XMLHttpRequest();

    // This is the address on the machine we're asking for data
    let apiRoute = "/api/grades";

    // When the request changes status, we run this anonymous function
    xhr.onreadystatechange = function(){
        let results;

        // Check if we're done
        if (xhr.readyState === xhr.DONE){
            // Check if we're successful
            if (xhr.status !== 200){
                console.error(`Could not get grades.
                    Status: ${xhr.status}`);
            }

            // And then call the function to update the HTML with our data
            populateGradebook(JSON.parse(xhr.responseText));
            }
    }.bind(this);
    xhr.open("get", apiRoute, true);
    xhr.send();
}

// Populate the table with grade data
function populateGradebook(data) {
    // This function will take the fetched grade data and populate the table
    console.log("Populating gradebook with data:", data);
    let tableElm = document.getElementById("gradebook"); // Get the gradebook table element
        data.forEach(function(assignment){ // For each row of data we're passed in
            let row = document.createElement("tr"); // create a table row element
            let columns = []; // Place to stick the columns of information
            columns.name = document.createElement('td'); // The first column's table data will be the name
            columns.name.appendChild(
            // Concatenate the full name: "last_name, first_name"
            document.createTextNode(assignment.last_name + ", " + assignment.first_name)
        );
        columns.grade = document.createElement('td'); // Second column will be the grade
        columns.grade.appendChild(
            // Just put the grade in text
            document.createTextNode(assignment.total_grade)
        );

        // Add the table data columns to the table row
        row.appendChild(columns.name);
        row.appendChild(columns.grade);

        // Add the row to the table itself to make the data visible
        tableElm.appendChild(row);
    });
}

// make an array of student data:
const studentsData = [];

//  resultDiv is used to access the div in HTML that is for showing each Student result:
const resultDiv = document.getElementById('result');
// downloadBTN is used to access the HTML of button Download that is click to download the file
const downloadBtn = document.getElementById('downloadBtn');


// now we make a function that is call on each submit of FOrm as it take the id of form:

// make a function on which EventListener is add that works on submit button (when click to submit button)
document.getElementById('numberForm').addEventListener('submit', function(e) {

    // this help to show the data and then show new screen on each addition of data( save from reload )
    e.preventDefault();

    // Get input values
    const rollNumber = document.getElementById('rollNumber').value;
    const percentage = parseFloat(document.getElementById('percentage').value);
    let randomNum;

    // If percentage is 10 or below, use the same percentage
    if (percentage <= 10) {
        randomNum = percentage.toFixed(2);
    } else {
        // Generate random number within ±10% of the percentage
        const min = percentage * 0.9;
        const max = Math.min(percentage * 1.1, 100); // Ensure it does not exceed 100
        randomNum = (Math.random() * (max - min) + min).toFixed(2);
    }

    // Convert percentage to a score out of 40
    const sessionalScore = Math.ceil((randomNum / 100 * 40).toFixed(2));

    // Store the data in the array
    studentsData.push({ rollNumber, percentage, randomNum, sessionalScore });

    // Display current entry result
    resultDiv.textContent = `Added Data for Roll Number: ${rollNumber} Converted Score: ${sessionalScore} out of 40`;

    // Clear the input fields for the next entry
    document.getElementById('numberForm').reset();

    // Show download button if there is at least one entry
    if (studentsData.length > 0) {
        downloadBtn.style.display = 'block';
    }
});

// Download CSV when the button is clicked
downloadBtn.addEventListener('click', function() {
    // Create CSV data
    let csvData = 'Roll Number,Percentage,Random Number,Sessional Score out of 40\n';
    studentsData.forEach(student => {
        csvData += `${student.rollNumber},${student.percentage},${student.randomNum},${student.sessionalScore}\n`;
    });

    // Download the CSV file
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', 'students_sessional_scores.csv');
    a.click();
});

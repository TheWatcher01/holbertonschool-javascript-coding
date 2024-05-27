#!/usr/bin/node
/**
 * @file 2-read_file.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module contains function that counts students in a CSV file
 */

const fs = require('fs');

/**
 * @function countStudents
 * @description Counts students in a CSV file
 * @param {string} filePath - Path to the CSV file
 * @throws {Error} If the file cannot be loaded
 */
function countStudents(filePath) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(filePath, 'utf8');

    // Split the file content by new lines and trim any extra spaces
    const lines = data.trim().split('\n');

    // Remove the header line
    const students = lines.slice(1);

    // Object to store the count of students per field
    const counts = {};

    // Iterate over each student line
    students.forEach((line) => {
      // Split the line by commas to get individual fields
      const student = line.split(',');

      // Get the field of the student (e.g., CS, SWE)
      const field = student[3];

      // Check if the field is not null
      if (field) {
        // Initialize the field in the counts object if not already present
        if (!counts[field]) {
          counts[field] = [];
        }

        // Add the student's first name to the list for the field
        counts[field].push(student[0]);
      }
    });

    // Print the total number of students
    console.log(`Number of students: ${students.length}`);

    // Print the number of students in each field and their names
    Object.keys(counts).forEach((field) => {
      console.log(`Number of students in ${field}: ${counts[field].length}. List: ${counts[field].join(', ')}`);
    });
  } catch (error) {
    // Throw an error if the file cannot be read
    throw new Error('Cannot load the database');
  }
}

// Export the function for use in other files
module.exports = countStudents;

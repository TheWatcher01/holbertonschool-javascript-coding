#!/usr/bin/node
/**
 * @file 3-read_file_async.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Asynchronous function that reads a file and prints the contents.
 */

const fs = require('fs').promises;

async function countStudents(pathFile) {
  try {
    const data = await fs.readFile(pathFile, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));

    const totalStudents = students.length;
    console.log(`Number of students: ${totalStudents}`);

    const studentsByFields = {};
    students.forEach((student) => {
      const field = student[3];
      if (!studentsByFields[field]) studentsByFields[field] = [];
      studentsByFields[field].push(student[0]);
    });

    for (const [field, names] of Object.entries(studentsByFields)) {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    }
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;

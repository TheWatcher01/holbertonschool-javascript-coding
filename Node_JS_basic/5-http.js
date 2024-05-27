#!/usr/bin/node
/**
 * @file 5-http.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module that creates complex HTTP server using http module.
 */

const http = require('http');
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

const app = http.createServer(async (req, res) => {
  const filePath = process.argv[2];
  if (!filePath) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Error: No database file specified');
    return;
  }

  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    try {
      const studentsData = await countStudents(filePath);
      res.end(`This is the list of our students\n${studentsData}`);
    } catch (error) {
      res.statusCode = 500;
      res.end(error.message);
    }
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found');
  }
});

const port = 1245;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;

#!/usr/bin/node
/**
 * @file 5-http.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module that creates a complex HTTP server using the http module.
 */

const http = require('http');
const fs = require('fs').promises;

const countStudents = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(',')).filter((student) => student.length === 4);

    const totalStudents = students.length;
    let response = `Number of students: ${totalStudents}\n`;

    const fields = {};
    students.forEach((student) => {
      const field = student[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    });

    for (const [field, names] of Object.entries(fields)) {
      response += `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`;
    }

    return response.trim();
  } catch (error) {
    throw new Error('Cannot load the database');
  }
};

const app = http.createServer(async (req, res) => {
  if (req.url === '/') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    try {
      const studentsData = await countStudents(process.argv[2]);
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

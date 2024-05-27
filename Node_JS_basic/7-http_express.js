#!/usr/bin/node
/**
 * @file 7-http_express.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module contains small complex HTTP server using Express.
 */

const express = require('express');

const app = express();
const port = 1245;
const fs = require('fs');

const countStudents = (path) => new Promise((resolve, reject) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      reject(new Error('Cannot load the database'));
      return;
    }

    const lines = data.split('\n').filter((line) => line.trim() !== '');
    const students = lines.slice(1).map((line) => line.split(','));
    const fields = {};

    students.forEach((student) => {
      const field = student[3];
      if (!fields[field]) {
        fields[field] = [];
      }
      fields[field].push(student[0]);
    });

    resolve(fields);
  });
});

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  const databasePath = process.argv[2];
  countStudents(databasePath)
    .then((fields) => {
      let response = 'This is the list of our students\n';
      const totalStudents = Object.values(fields).reduce((acc, field) => acc + field.length, 0);
      response += `Number of students: ${totalStudents}\n`;

      for (const [field, students] of Object.entries(fields)) {
        response += `Number of students in ${field}: ${students.length}. List: ${students.join(', ')}\n`;
      }

      res.send(response.trim());
    })
    .catch((error) => res.status(500).send(error.message));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;

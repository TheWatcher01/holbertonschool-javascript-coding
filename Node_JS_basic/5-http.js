#!/usr/bin/node
/**
 * @file 5-http.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module that creates a complex HTTP server using the http module.
 */

const http = require('http');
const fs = require('fs');
const csv = require('csv-parser');

const app = http.createServer((req, res) => {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    const dbFile = process.argv[2];

    if (!dbFile) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Database file is required');
      return;
    }

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('This is the list of our students\n');

    const results = { CS: [], SWE: [] };

    fs.createReadStream(dbFile)
      .pipe(csv())
      .on('data', (row) => {
        if (row.field && row.firstname) {
          if (row.field === 'CS') {
            results.CS.push(row.firstname);
          } else if (row.field === 'SWE') {
            results.SWE.push(row.firstname);
          }
        }
      })
      .on('end', () => {
        const totalStudents = results.CS.length + results.SWE.length;
        res.write(`Number of students: ${totalStudents}\n`);
        res.write(`Number of students in CS: ${results.CS.length}. List: ${results.CS.join(', ')}\n`);
        res.write(`Number of students in SWE: ${results.SWE.length}. List: ${results.SWE.join(', ')}`);
        res.end();
      })
      .on('error', (err) => {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Error reading the file: ${err.message}`);
      });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server is listening on port 1245');
});

module.exports = app;

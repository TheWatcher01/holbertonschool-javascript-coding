#!/usr/bin/node
/**
 * @file 4-http.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module contains a small HTTP server using Node's HTTP module.
 */

const http = require('http');

const app = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Holberton School!');
});

const port = 1245;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;

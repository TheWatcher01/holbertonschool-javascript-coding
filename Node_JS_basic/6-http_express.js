#!/usr/bin/node
/**
 * @file 6-http_express.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module contains small HTTP server using Express.
 */

const express = require('express');

const app = express();
const port = 1245;

// Define the root route
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

module.exports = app;

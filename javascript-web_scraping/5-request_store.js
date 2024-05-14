#!/usr/bin/node

/**
 * @file 5-request_store.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script fetches the contents of a webpage and stores it in a file.
 */

'use strict';
// The 'use strict' directive is used to ensure that the code should be executed in "strict mode",
// which helps in catching common coding mistakes and "unsafe" actions.

const request = require('request');

const fs = require('fs');

const url = process.argv[2];
// The URL for the GET request is taken from the command line arguments.

const filePath = process.argv[3];
// The file path for storing the webpage contents is taken from the command line arguments.

request(url, function (error, response, body) {
  // The 'request' function from the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there's an error with the request (like a network problem), it will be logged to the console and the function will return early.
    console.error('Error:', error);
    return;
  }

  fs.writeFile(filePath, body, 'utf-8', (error) => {
    // The 'writeFile' function from the 'fs' module is used to write data to a file.
    // If the file does not exist, it is created. If it does exist, it is replaced.
    // The callback function takes one argument: 'error'.

    if (error) {
      // If there's an error writing the file, it will be logged to the console.
      console.error('Error:', error);
    } else {
      // If the file is written successfully, a success message is logged to the console.
      console.log('The content was saved!');
    }
  });
});

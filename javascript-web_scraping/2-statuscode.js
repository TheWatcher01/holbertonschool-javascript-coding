#!/usr/bin/node

/**
 * @file 2-statuscode.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script will display status code of GET request to a given URL.
 */

'use strict';

const request = require('request');

const url = process.argv[2];
// The URL for the GET request is taken from the command line arguments.

request.get(url, (error, response, body) => {
  // The 'get' method of the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there is an error with the request (like a network problem),
    // it will be logged to the console and the function will return early.
    console.error(error);
    return;
  }

  console.log(`code: ${response.statusCode}`);
  // If there is no error, the status code of the response is logged to the console.
}).on('error', err => {
  // This is an event listener for the 'error' event.
  // If an error event is emitted (like a problem with the response), the error will be logged to the console.
  console.error(err);
});

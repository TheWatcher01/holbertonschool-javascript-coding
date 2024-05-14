#!/usr/bin/node

/**
 * @file 3-starwars_title.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script prints title of a Star Wars movie where episode number matches a given integer.
 */

'use strict';
// The 'use strict' directive switches script to strict mode, which helps catch common coding mistakes & "unsafe" actions.

const request = require('request');

const movieId = process.argv[2];
// The movie ID for the GET request is taken from the command line arguments.

const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;
// The URL for the GET request is constructed using the movie ID.

request(url, function (error, response, body) {
  // The 'request' function of the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there is an error with request (like a network problem), it will be logged to console and function will return early.
    console.error('error:', error);
    return;
  }

  try {
    const movie = JSON.parse(body);
    // The 'body' of the response is parsed from JSON to a JavaScript object.

    if (movie.detail === 'Not found') {
      // If the movie detail is 'Not found', a message is logged to the console and the function returns early.
      console.log('No movie found with this ID');
      return;
    }

    console.log(movie.title);
    // If there is no error and the movie is found, the title of the movie is logged to the console.
  } catch (err) {
    // If an error occurs during JSON parsing, log the error and provide a user-friendly message.
    console.error('Failed to parse JSON:', err);
  }
});

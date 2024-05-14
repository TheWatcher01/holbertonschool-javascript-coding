#!/usr/bin/node

/**
 * @file 4-starwars_count.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script prints the number of movies where the character “Wedge Antilles” is present.
 */

'use strict';
// The 'use strict' directive switches the script to the strict mode, which helps catch common coding mistakes and "unsafe" actions.

const request = require('request');

const apiUrl = process.argv[2];
// The API URL for the GET request is taken from the command line arguments.

// Prepare the options for the request
const options = {
  url: apiUrl,
  headers: {
    Accept: 'application/json'
  }
};
// The options for the request are prepared. The 'url' is set to the API URL, and the 'Accept' header is set to 'application/json'.

request(options, function (error, response, body) {
  // The 'request' function of the 'request' module is used to make a GET request with the specified options.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there is an error with the request (like a network problem), it will be logged to the console and the function will return early.
    return console.error('Error:', error);
  }

  // Check if the response status code is 200
  if (response.statusCode !== 200) {
    // If the status code of the response is not 200, an error message is logged to the console and the function returns early.
    return console.error(`Failed to get a valid response: ${response.statusCode}`);
  }

  try {
    const data = JSON.parse(body);
    // The 'body' of the response is parsed from JSON to a JavaScript object.

    if (!data.results) {
      // If there are no results in the data, an error message is logged to the console and the function returns early.
      return console.error('No results found in the response');
    }

    let count = 0;
    // A counter is initialized to keep track of the number of movies where the character “Wedge Antilles” is present.

    for (const film of data.results) {
      // The results are iterated over with a for...of loop.

      if (film.characters.includes('https://swapi-api.hbtn.io/api/people/18/')) {
        // If the 'characters' array of the film includes the URL of the character “Wedge Antilles”, the counter is incremented.
        count++;
      }
    }

    console.log(count);
    // The final count is logged to the console.
  } catch (err) {
    // If there is an error while parsing the JSON or iterating over the results, it will be caught and logged to the console.
    console.error('Failed to parse JSON:', err);
  }
});

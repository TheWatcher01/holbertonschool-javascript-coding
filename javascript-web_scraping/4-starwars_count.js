#!/usr/bin/node

/**
 * @file 4-starwars_count.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script that prints the number of movies where the character “Wedge Antilles” is present.
 */

'use strict';
// The 'use strict' directive is used to ensure that the code should be executed in "strict mode", which helps in catching common coding mistakes and "unsafe" actions.

const request = require('request');

const apiUrl = process.argv[2];
// The API URL for the GET request is taken from the command line arguments.

request(apiUrl, (error, response, body) => {
  // The 'request' function from the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there's an error with the request (like a network problem), it will be logged to the console and the function will return early.
    return console.error('Error:', error);
  }

  if (response.statusCode !== 200) {
    // If the response status code is not 200, an error message is logged to the console and the function returns early.
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
    // A counter is initialized to keep track of the number of films where the character “Wedge Antilles” appears.

    for (const film of data.results) {
      // The results are iterated over with a for...of loop.

      for (const character of film.characters) {
        // The 'characters' array of the film is iterated over with another for...of loop.

        if (character.endsWith('/18/')) {
          // If the character URL ends with '/18/', which is the ID of “Wedge Antilles”, the counter is incremented and the inner loop is exited early.
          count++;
          break;
        }
      }
    }

    console.log(count);
    // The final count is logged to the console.
  } catch (err) {
    // If there's an error parsing the JSON or iterating over the results, it will be caught and logged to the console.
    console.error('Failed to parse JSON:', err);
  }
});

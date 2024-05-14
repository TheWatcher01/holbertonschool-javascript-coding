#!/usr/bin/node

/**
 * @file 4-starwars_count.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script prints the number of movies where the character “Wedge Antilles” is present.
 */

'use strict';
// The 'use strict' directive switches the script to strict mode, which helps catch common coding mistakes and "unsafe" actions.

const request = require('request');

const apiUrl = process.argv[2];
// The apiUrl for the GET request is taken from the command line arguments.

request(apiUrl, function (error, response, body) {
  // The 'request' function of the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there is an error with the request (like a network problem), it will be logged to the console and the function will return early.
    return console.error('Error:', error);
  }

  let count = 0;
  const films = JSON.parse(body).results;
  // The 'results' property contains the list of films from the API response.

  for (const film of films) {
    const characters = film.characters;
    // The 'characters' property is an array of URLs, each pointing to a character involved in the film.

    if (characters.includes('https://swapi-api.hbtn.io/api/people/18/')) {
      // We check if the characters of the film include the URL that corresponds to Wedge Antilles (ID 18).
      count++;
    }
  }

  console.log(count);
  // Print the count of films featuring Wedge Antilles.
});

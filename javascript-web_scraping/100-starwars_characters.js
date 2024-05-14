#!/usr/bin/node

/**
 * @file 100-starwars_characters.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script displays all characters of a Star Wars movie.
 */

'use strict';
// The 'use strict' directive is used to enforce stricter parsing and error handling on your JavaScript code at runtime.

const request = require('request');
// The 'request' module is imported. This module allows you to make HTTP requests in a simple way.

// The movie ID is retrieved from the command line arguments.
const movieId = process.argv[2];

// The URL to access the movie details via the SWAPI API is constructed.
const apiUrl = `https://swapi-api.hbtn.io/api/films/${movieId}`;

// Function to perform HTTP GET requests and handle the received JSON data.
function fetchData (url, callback) {
  request(url, (error, response, body) => {
    if (error) {
      // If there's an error with the request (like a network problem), it will be logged to the console and the function will return early.
      console.error('Error:', error);
      return;
    }
    try {
      const data = JSON.parse(body);
      callback(data);
    } catch (error) {
      // If there's an error parsing the JSON, it will be logged to the console.
      console.error('Error parsing JSON:', error);
    }
  });
}

// Initial call to retrieve the movie details and then the characters.
fetchData(apiUrl, (data) => {
  const characters = data.characters;
  const characterNames = [];
  let count = 0;

  // Iterating over each character URL to retrieve the name.
  characters.forEach((characterUrl) => {
    fetchData(characterUrl, (characterData) => {
      characterNames.push(characterData.name);

      // Incrementing the counter for each processed character.
      count++;
      if (count === characters.length) {
        // All characters have been retrieved, they are displayed.
        for (let i = 0; i < characterNames.length; i++) {
          console.log(characterNames[i]);
        }
      }
    });
  });
});

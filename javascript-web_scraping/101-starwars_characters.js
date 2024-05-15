#!/usr/bin/node

/**
 * @file 101-starwars_characters.js
 * @author TheWatcher01
 * @date 15-05-2024
 * @description This Node.js script fetches and prints the names of all characters
 * from a specified Star Wars movie using the Star Wars API (SWAPI). The characters
 * are printed in the same order as they appear in the "characters" list in the
 * /films/ response.
 */

'use strict';

const request = require('request');
const util = require('util');

// Convert the callback-based "request" function to a Promise-based function
// using Node.js "util.promisify" for better async handling.
const requestPromise = util.promisify(request);

// The ID of the movie is passed as a command line argument.
const movieId = process.argv[2];
const url = `https://swapi-api.hbtn.io/api/films/${movieId}/`;

/**
 * @async
 * @function fetchCharacterNames
 * @description Asynchronously fetches and prints the names of all characters
 * from a specified Star Wars movie using the SWAPI. The characters are printed
 * in the same order as they appear in the "characters" list in the /films/ response.
 *
 * @throws Will throw an error if the fetch operation fails or if the
 * "characters" property in the response is not an array.
 */
async function fetchCharacterNames () {
  try {
    // Fetch the film data from the SWAPI.
    const response = await requestPromise({ url, json: true });
    const body = response.body;

    const characters = body.characters;

    // Validate that "characters" is an array.
    if (!Array.isArray(characters)) {
      console.error('Characters is not defined or not an array');
      return;
    }

    // Fetch and print each character's name in the order they appear in the "characters" list.
    for (const characterUrl of characters) {
      const response = await requestPromise({ url: characterUrl, json: true });
      const body = response.body;
      console.log(body.name);
    }
  } catch (error) {
    console.error(error);
  }
}

fetchCharacterNames();

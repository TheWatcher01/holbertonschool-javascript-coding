#!/usr/bin/node

/**
 * @file 6-completed_tasks.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script computes the number of tasks completed by each user ID.
 */

'use strict';
// The 'use strict' directive is used to enforce stricter parsing and error handling on your JavaScript code at runtime.

const request = require('request');
// The 'request' module is imported. This module allows you to make HTTP requests in a simple way.

const url = process.argv[2];
// URL of the JSON API is stored in the 'url' variable, it is first command line argument passed to the script.

request(url, function (error, response, body) {
  // The 'request' function from the 'request' module is used to make a GET request to the specified URL.
  // The callback function takes three arguments: 'error', 'response', and 'body'.

  if (error) {
    // If there's an error with the request (like a network problem), it will be logged to the console and the function will return early.
    console.error(error);
    return;
  }

  const todos = JSON.parse(body);
  // The body of the response is parsed from JSON into a JavaScript object and stored in the 'todos' variable.

  const completedTasks = {};
  // An empty object is created to store the number of completed tasks for each user.

  todos.forEach(todo => {
    // The 'forEach' method is used to execute a function on each item in the 'todos' array.

    if (todo.completed) {
      // If the 'completed' property of the todo is true, the count of completed tasks for the user is incremented.

      if (completedTasks[todo.userId]) {
        // If the user already has a count in the 'completedTasks' object, their count is incremented.
        completedTasks[todo.userId]++;
      } else {
        // If the user does not have a count in the 'completedTasks' object, their count is set to 1.
        completedTasks[todo.userId] = 1;
      }
    }
  });

  console.log(completedTasks);
  // The 'completedTasks' object is logged to the console, it contains number of completed tasks for each user.
});

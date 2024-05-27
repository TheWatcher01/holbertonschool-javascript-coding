#!/usr/bin/node
/**
 * @file 1-stdin.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module contains a program that reads from stdin and prints to stdout.
 */

// Display a welcome message asking for the user's name
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen for user input on stdin
process.stdin.on('data', (data) => {
  if (data !== null) {
    // Print the user's name
    process.stdout.write(`Your name is: ${data.toString().trim()}\n`);
  }
});

// Handle the end of the program
process.stdin.on('end', () => {
  // Display a closing message when the program ends
  process.stdout.write('This important software is now closing\n');
});

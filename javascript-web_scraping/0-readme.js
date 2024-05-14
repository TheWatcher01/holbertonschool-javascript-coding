#!/usr/bin/node

/**
 * @file 0-readme.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script reads a file and prints its content to the console.
 */

'use strict';
const fs = require('fs');
const filePath = process.argv[2];

fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(data);
});

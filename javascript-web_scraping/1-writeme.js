#!/usr/bin/node

/**
 * @file 1-writeme.js
 * @author TheWatcher01
 * @date 14-05-2024
 * @description This script writes a string to a file.
 */

'use strict';

const fs = require('fs');

const filePath = process.argv[2];
const content = process.argv[3];

fs.writeFile(filePath, content, 'utf-8', err => {
  if (err) {
    console.error(err);
  }
});

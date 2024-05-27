#!/usr/bin/node
/**
 * @file server.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module containing the server configuration.
 */

const express = require('express');
const router = require('./routes/index');

const appServer = express();
const port = 1245;

appServer.use('/', router);

appServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = appServer;

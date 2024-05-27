#!/usr/bin/node
/**
 * @file AppController.js
 * @author TheWatcher01
 * @date 27-05-2024
 * @description Module containing the AppController class.
 */

class AppController {
  static getHomepage(req, res) {
    res.status(200).send('Hello Holberton School!');
  }
}

module.exports = AppController;

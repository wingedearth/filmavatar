// Set up modules
var express         = require('express');
var router          = express.Router();
var request         = require('request');

// load environmental variables
require('dotenv').load();

// Set up controllers
  var UsersCtrl       = require('../controllers/users');
  // var ChannelsCtrl    = require('../controllers/channels');
  // var VideosCtrl      = require('../controllers/videos');
  var InfoCtrl        = require('../controllers/info');

// load environmental variables
require('dotenv').load();

// Define and export the routes
module.exports = function(app) {

  // add '/api' path to routes
  app.use('/api', router);

  // Search OMDB by video's title
  router.post('/info', InfoCtrl.searchTitle);

  // User routes
  router.post('/login', UsersCtrl.loginUser)
  router.post('/users', UsersCtrl.createUser);

};

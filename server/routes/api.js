// Set up modules
var express         = require('express');
var router          = express.Router();
var request         = require('request');

// load environmental variables
require('dotenv').load();

// Set up controllers
  var UsersCtrl       = require('../controllers/users');
  var ChannelsCtrl    = require('../controllers/channels');
  // var VideosCtrl      = require('../controllers/videos');
  var InfoCtrl        = require('../controllers/info');

// load environmental variables
require('dotenv').load();

// Define and export the routes
module.exports = function(app) {

  // add '/api' path to routes
  app.use('/api', router);

  // Search OMDB by video's title
  router.post('/info',             InfoCtrl.searchTitle);
  app.post('/info',                InfoCtrl.searchTitle);

  // User routes
  router.post('/login',            UsersCtrl.loginUser);
  router.post('/users',            UsersCtrl.createUser);
  router.get('/users',             UsersCtrl.getUsers);
  router.get('/me',                UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   UsersCtrl.getUser);
  router.get('/users/:id',         UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   UsersCtrl.getUser);
  router.delete('/users/:id',      UsersCtrl.tokenVerify,
                                   UsersCtrl.deleteUser);
  router.put('/users/:id',         UsersCtrl.tokenVerify,
                                   UsersCtrl.updateUser);
  router.put('/me/addchannel',     UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   UsersCtrl.addMyChannel);
  router.get('/mychannels',        UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   // UsersCtrl.refreshMyChannels,
                                   UsersCtrl.channelsMine);
  router.get('/mychannels/:id',    UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   UsersCtrl.channelMine);
  router.put('/me/delchannel',     UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   UsersCtrl.deleteMyChannel);

  // Channel routes
  router.post('/channels',         UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   ChannelsCtrl.channelCreate);
  router.get('/channels',          ChannelsCtrl.channelIndex);
  router.get('/channels/:id',      ChannelsCtrl.getChannel,
                                   ChannelsCtrl.showChannel);
  router.put('/channels/:id',      UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   ChannelsCtrl.editChannel);
  router.delete('/channels/:id',   UsersCtrl.tokenVerify,
                                   UsersCtrl.loadAuthUser,
                                   ChannelsCtrl.getChannel,
                                   ChannelsCtrl.deleteChannel);

};



// Set up modules
var express         = require('express');
var router          = express.Router();
var request         = require('request');

// load environmental variables
require('dotenv').load();

// Set up controllers
var UsersCtrl       = require('../controllers/users');
var ChannelsCtrl    = require('../controllers/channels');
var VideosCtrl      = require('../controllers/videos');
var InfoCtrl        = require('../controllers/info');
var MyChannelsCtrl  = require('../controllers/mychannels');

require('dotenv').load(); // load environmental variables

// Define and export the routes
module.exports = function(app) {

  app.use('/api', router); // add '/api' path to routes

/**********************************
* Search OMDB by video's title
***********************************/
  router.post('/info',                InfoCtrl.searchTitle);
  app.post('/info',                   InfoCtrl.searchTitle);

/**********************************
* User routes
***********************************/
  router.post('/login',               UsersCtrl.loginUser);
  router.post('/users',               UsersCtrl.createUser);
  router.get('/users',                UsersCtrl.getUsers);
  router.get('/me',                   UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      UsersCtrl.getUser);
  router.get('/users/:id',            UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      UsersCtrl.getUser);
  router.delete('/users/:id',         UsersCtrl.tokenVerify,
                                      UsersCtrl.deleteUser);
  router.put('/users/:id',            UsersCtrl.tokenVerify,
                                      UsersCtrl.updateUser);


/**********************************
* MyChannel routes
***********************************/

  router.put('/me/channels',          UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      MyChannelsCtrl.loadMyChannel,
                                      MyChannelsCtrl.beCurator);
  router.post('/me/channels/add/',    UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      MyChannelsCtrl.verifyChannel,
                                      MyChannelsCtrl.addMyChannel);
  router.get('/me/channels',          UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.loadChannels,
                                      MyChannelsCtrl.refreshMyChannels,
                                      MyChannelsCtrl.updateMyChannels,
                                      MyChannelsCtrl.channelsMine);
  router.delete('/me/channels',       UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      MyChannelsCtrl.loadMyChannel,
                                      MyChannelsCtrl.deleteMyChannel);
  router.delete('/me/channels/:id',   UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      MyChannelsCtrl.delMyChannel);

/**********************************
* Channel Routes
***********************************/
  router.post('/channels',            UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.channelCreate);
  router.get('/channels',             ChannelsCtrl.channelIndex);
  router.get('/channels/:id',         ChannelsCtrl.getChannel,
                                      ChannelsCtrl.showChannel);
  router.put('/channels/:id',         UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.editChannel);
  router.delete('/channels/:id',      UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.getChannel,
                                      ChannelsCtrl.deleteChannel);

/**********************************
* Video Routes
***********************************/
  router.get('/channels/:id/videos',  UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.loadChannel,
                                      VideosCtrl.getChannelVideos);
  router.post('/channels/:id/videos', UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.loadChannel,
                                      VideosCtrl.addVideo);
  router.delete('/channels/:id/videos',
                                      UsersCtrl.tokenVerify,
                                      UsersCtrl.loadAuthUser,
                                      ChannelsCtrl.loadChannel,
                                      VideosCtrl.loadVideoIndex,
                                      VideosCtrl.deleteVideo)
};



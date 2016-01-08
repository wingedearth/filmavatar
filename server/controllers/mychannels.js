var bcrypt    = require('mongoose-bcrypt'),
    jwt       = require('jsonwebtoken'),
    _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user'),
    Channel   = require('../models/channel'),
    MyChannel = require('../models/mychannel');

                require('dotenv').load();
var secretKey = process.env.SECRET_KEY;


/**********************
*    Add myChannel
**********************/

function addMyChannel(req, res) {
  if (req.channel) {
    newMyChannel              = new MyChannel();
    newMyChannel.name         = req.body.name;
    newMyChannel.isCurator    = false;
    User.findById(req.user._id, function(err, user) {
      user.myChannels.push(newMyChannel)
      user.save(function(err) {
        if (err) res.send(err);
        var message = 'Subscribed to Channel ' + newMyChannel.name + '!';
        res.json({
          message: message,
        });
      });
    });
  } else {
      res.json({
        message: "Channel not found. Sorry, Charlie."
      });
  }
}


/*************************************
*    Get list of myChannels, in detail
**************************************/

function channelsMine(req, res) {
  res.json(req.user.myChannels);
}

/*******************************************
*    Get a myChannel based on id parameter
*******************************************/

function channelMine(req, res) {
  MyChannel.findById(req.params.id, function(err, myChannel) {
    if (err) res.send(err);
    res.json(myChannel);
  });
}


/*************************************
*    Remove a myChannel
**************************************/

// remove myChannel by sending name in req.body
function deleteMyChannel(req, res) {
  var index = _.findIndex(req.user.myChannels, {'name': req.body.name });
  var deadChannel = _.find(req.user.myChannels, {'name': req.body.name });
  User.findById(req.user._id, function(err, user) {
    console.log("deadChannel ", deadChannel);
    console.log("index ", index);
    user.myChannels.splice(index, 1);
    console.log("user.myChannels", user.myChannels);
    user.save(function(err) {
      if (err) res.send(err);
      res.json({
      message: 'myChannel successfully removed.',
      myChannels: user.myChannels
      });
    });
  });
}

// remove myChannel by sending myChannel _id in req.params.id
function delMyChannel(req, res) {
  var index = _.findIndex(req.user.myChannels, function(myChannel) {
    return myChannel._id == req.params.id;
  });
  var deadChannel = _.find(req.user.myChannels, function(myChannel) {
    return myChannel._id == req.params.id;
  });
  User.findById(req.user._id, function(err, user) {
    user.myChannels.splice(index, 1);

    user.save(function(err) {
      console.log("checkpoint 3");
      if (err) res.send(err);
      var message = "myChannel deleted!";
      res.json({message: message});
    });
  });
}

/*************************************
*    Refresh myChannels list
**************************************/

function refreshMyChannels(req, res, next) {
  var mineChannels = req.user.myChannels;
  for (var i=mineChannels.length - 1; i >= 0; i--) {
    for (var j=0; j<=req.channels.length; j++) {
      if (j==req.channels.length) {
        req.user.myChannels.splice(i, 1);
        break;
      }
      if (req.channels[j].name == mineChannels[i].name) {
        break;
      }
    }
  }
  next();
}

function updateMyChannels(req, res, next) {
  User.findById(req.user._id, function(err, user) {
    user.myChannels = req.user.myChannels;
    user.save();
    next();
  });
}

function verifyChannel(req, res, next) {
  Channel.findOne({'name': req.body.name}, function(err, channel) {
    req.channel = null;
    if (channel)
      req.channel = channel;
    next();
  });
}

function makeCurator(req, res) {
  User.findById(req.user._id, function(err, user) {

  });
}


module.exports = {

  makeCurator:        makeCurator,
  verifyChannel:      verifyChannel,
  addMyChannel:       addMyChannel,
  updateMyChannels:   updateMyChannels,
  refreshMyChannels:  refreshMyChannels,
  delMyChannel:       delMyChannel,
  deleteMyChannel:    deleteMyChannel,
  channelMine:        channelMine,
  channelsMine:       channelsMine
}

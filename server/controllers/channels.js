var _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user'),
    Channel   = require('../models/channel');

/******************************
*    Get Channels List
*******************************/
function channelIndex(req, res) {
  Channel.find({}, function(err, channels) {
    if (err) res.send(err);
    res.json(channels); // send the channels list
  })
}

function loadChannels(req, res, next) {
  Channel.find({}, function(err, channels) {
    if (err) res.send(err);
    req.channels = channels;
    next();
  })
}

/******************************
*    Create Channel
*******************************/
var channelCreate     = function(req, res) {
  var channel         = new Channel();
  channel.name        = req.body.name;
  channel.imageUrl    = req.body.imageUrl;
  channel.createdBy   = req.user.email;
  channel.curatedBy.push(req.user.email);
  channel.isPrivate   = false;
  channel.description = req.body.description;

  channel.save(function(err, savedChannel) {
    if (err) {
      res.send(err)
    }

    // add channel to user's myChannels
    User.findById(req.user._id, function(err, user) {
      user.myChannels.push({name: req.body.name, isCurator: true, isCreator: true});
      user.save(function(err, savedUser) {
        console.log("Congratulations on starting a new channel!")
        res.json(savedChannel); //// return the channel
      });
    });
  });
};

/******************************
*    Retrieve a Channel
*******************************/

function getChannel(req, res, next) {
  Channel.findById(req.params.id, function (err, channel) {
    if (err) res.send(err);
    req.channel = channel;
    next();
  });
}

function showChannel(req, res) {
  res.json(req.channel);
}

/******************************
*    Edit a Channel
*******************************/

function editChannel(req, res) {
  Channel.findById(req.params.id, function (err, channel) {
    if (err) res.send(err);

    // if (req.body.name)        channel.name        = req.body.name;
    if (req.body.description) channel.description = req.body.description;
    if (req.body.imageUrl)    channel.imageUrl    = req.body.imageUrl;
    if (req.body.isPrivate)   channel.isPrivate   = req.body.isPrivate;
    if (req.body.video) {
      channel.videos.push({
        title:  req.body.video.title,
        url:    req.body.video.url
      });
    }

    channel.save(function(err) {
      if (err) res.send(err);
      res.json({
        message: "Channel updated!",
        channel: channel
      });
    });
  });
}

/******************************
*    Delete a Channel
*******************************/

function deleteChannel(req, res) {

  if ((checkCurator(req.user, req.channel)) ||
      (req.user.isAdmin == true)) {

    // delete the channel
    Channel.remove({_id: req.params.id}, function(err, deletedchannel) {
      if (err) res.send(err);
      var message = 'Channel ' + deletedchannel.name + ' successfully deleted.';
      res.json({ message: message });
    });

  } else {
    res.json({
      success: false,
      message: 'You are not a Curator'
    });
  }
}



// Export the function/s as JSON
module.exports = {
  loadChannels:     loadChannels,
  deleteChannel:    deleteChannel,
  editChannel:      editChannel,
  channelCreate:    channelCreate,
  channelIndex:     channelIndex,
  getChannel:       getChannel,
  showChannel:      showChannel
}


/*******************
*  Helper Functions
********************/

function checkCurator(user, channel) {
  var curator = false;
  user.myChannels.forEach(function(myChannel) {
    if (channel.name == myChannel.name) {
      if (myChannel.isCurator==true) {
        curator = true;
        return curator;
      }
    }
  });
}





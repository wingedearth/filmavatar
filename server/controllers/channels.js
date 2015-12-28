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
      user.myChannels.push({channelName: req.body.name, isCurator: true, isCreator: true});
      user.save(function(err, savedUser) {
        console.log("Congratulations on starting a new channel!")
        res.json(savedChannel); //// return the channel
      });
    });
  });
};




// Export the function/s as JSON
module.exports = {
  // channelShow:   channelShow,
  // channelUpdate: channelUpdate,
  // channelDelete: channelDelete,
  channelCreate: channelCreate,
  channelIndex:  channelIndex
}

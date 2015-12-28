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

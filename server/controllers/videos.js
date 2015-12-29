var _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user'),
    Channel   = require('../models/channel');


function getChannelVideos(req, res) {
    res.send(req.channel.videos);
}

function addVideo(req, res) {
  if ((req.body.video) && (req.curator==true)) {
    Channel.findById(req.params.id, function(err, channel) {
      channel.videos.push(req.body.video);
      channel.save(function(err) {
        res.json({
          message: "Video added!",
          video: req.body.video
        });
      });
    });
  }
}


module.exports = {

  getChannelVideos:   getChannelVideos,
  addVideo:           addVideo

}

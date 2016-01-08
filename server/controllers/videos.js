var _         = require('lodash'),
    env       = require('../config/environment'),
    User      = require('../models/user'),
    Channel   = require('../models/channel');
    Video     = require('../models/video');


function loadVideoIndex(req, res, next) {
  console.log("req.channel2: ", req.channel);
  req.indx = findIndx(req.channel.videos, req.body.title);
  next();
}

/*************************************
*    Get Videos in Selected Channel
**************************************/

function getChannelVideos(req, res) {
    res.send(req.channel.videos);
}

function getVideo(req, res) {
  var index = _.findIndex(req.channel.videos, function(video) {
      return video._id == req.params.vidId;
    });
  res.json(req.channel.videos[index]);
}

/***********************************
*    Add Video to Selected Channel
************************************/

function addVideo(req, res) {
  if ((req.body.title) && (req.curator==true) && (req.body.url)) {
    var video   = new Video();
    video.title = req.body.title;
    video.url   = req.body.url;
    Channel.findById(req.params.id, function(err, channel) {
      channel.videos.push(video);
      channel.save(function(err) {
        res.json({
          message: "Video added!",
          video: req.body.video
        });
      });
    });
  }
}

/**************************************
*    Delete Video from Selected Channel
***************************************/

function deleteVideo(req, res) {
  if ((req.body.title) && (req.curator==true)) {
    var index = _.findIndex(req.channel.videos, function(video) {
      return video.title == req.body.title;
    });
    console.log("index: ", index);

    Channel.findById(req.params.id, function(err, channel) {
      if (err) res.send("ERROR: ", err); // report errors
      channel.videos.splice(index, 1);
      // channel.videos.splice(req.indx, 1); // remove video from array
      channel.save(function(err) {
        if (err) res.send(err);
        var message = "Video Deleted: " + req.body.title;
        res.json({
          message: message,
          channel: channel
        });
      });
    });
  }
}


module.exports = {

  getVideo:           getVideo,
  loadVideoIndex:     loadVideoIndex,
  deleteVideo:        deleteVideo,
  addVideo:           addVideo,
  getChannelVideos:   getChannelVideos
}

// Helper functions

function findIndx(videosArray, title) {
  for (i = 0; i < videosArray.length; i++) {
    if (videosArray[i].title === title) {
        return i;
    }
  }
  return false;
}




var mongoose = require('mongoose');
var request = require('request');
var Video   = require("../models/video");


module.exports = {
  searchTitle: function(req, res, next) {
    Video.findOne( {title : req.body.title}, function(video) {
      console.log("video: ", video);
      var vidTitle = JSON.stringify(req.body.title);
      var uri = "http://www.omdbapi.com/?t=" + encodeURIComponent(vidTitle);

      request.get(uri, function(err, response, body) {
        res.send(body);
      });
    });
  }
}

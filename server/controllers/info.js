var mongoose = require('mongoose');
var request = require('request');


module.exports = {
  searchTitle: function(req, res, next) {
    console.log("Searching for: ", req.body.title);
    var uri = "http://www.omdbapi.com/?t=" + encodeURIComponent(req.body.title);
    request.get(uri, function(err, response, body) {
      if (err) {
        res.send(err)
      }
      res.send(body);
    });
  }
};

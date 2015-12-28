var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  title:        {type: String, require: true},
  url:          {type: String, require: true},
  votes:        [{userEmail: String, vote: Number}],
});


// Export the schema
module.exports = mongoose.model('Video', videoSchema);


var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  title:        {type: String},
  url:          {type: String},
  votes:        [{userEmail: String, vote: Number}],
});


// Export the schema
module.exports = mongoose.model('Video', videoSchema);


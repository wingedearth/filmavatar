var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  title:        {type: String, require: true},
  url:          {type: String, require: true},
  addedBy:      { userId: String, userEmail: String },
  votes:        [{userId: String, vote: Number}],
  dateAdded:    { type: Date, default: Date.now }
});


// Export the schema
module.exports = mongoose.model('Video', videoSchema);


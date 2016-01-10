var mongoose = require('mongoose');

var videoSchema = new mongoose.Schema({
  eventId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Video' },
  created:      { type: Date, default: Date.now },
  title:        {type: String},
  url:          {type: String},
  votes:        [{userEmail: String, vote: Number}],
});


// Export the schema
module.exports = mongoose.model('Video', videoSchema);


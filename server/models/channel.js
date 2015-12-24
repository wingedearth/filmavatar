var mongoose = require('mongoose');
var videoSchema = require('./video');

var channelSchema = new mongoose.Schema({
  name: String,
  createdBy: {userId: String, userEmail: String},
  curatedBy: [{userId: String, userEmail: String}],
  videos: [videoSchema],
  isPrivate: Boolean,
  accessList: [],
  description: String,
  votes: [{userId: String, vote: Number}],
  dateAdded: { type: Date, default: Date.now }
});

// Export the schema
module.exports = mongoose.model('Channel', channelSchema);

var mongoose = require('mongoose');
var videoSchema = require('./video');

var channelSchema = new mongoose.Schema({
  name: { type: String, require: true, unique: true },
  createdBy: { userEmail: String },
  curatedBy: [{ userEmail: String }],
  videos: [videoSchema],
  isPrivate: {type: Boolean, default: false},
  accessList: [],
  description: String,
  votes: [{userEmail: String, vote: Number}],
  dateAdded: { type: Date, default: Date.now }
});

// Export the schema
module.exports = mongoose.model('Channel', channelSchema);

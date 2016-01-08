var mongoose = require('mongoose');
var Video    = require('./video');

var channelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageUrl: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Televison_Hungarian_ORION_1957.jpg/800px-Televison_Hungarian_ORION_1957.jpg"},
  createdBy: String,
  curatedBy: [String],
  videos: [Video.schema],
  isPrivate: {type: Boolean, default: false},
  accessList: [],
  description: String,
  votes: [{userEmail: String, vote: Number}],
  dateAdded: { type: Date, default: Date.now }
});

// Export the schema
module.exports = mongoose.model('Channel', channelSchema);


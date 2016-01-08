var mongoose = require('mongoose');
var videoSchema = require('./video');

var channelSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  imageUrl: {type: String, default: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Televison_Hungarian_ORION_1957.jpg/800px-Televison_Hungarian_ORION_1957.jpg"},
  createdBy: String,
  curatedBy: [String],
  videos: [{
    title: {type: String, required: true, unique: true},
    url: {type: String, required: true},
    votes: [{
        userEmail: {type: String, required: true},
        vote: {type: Number, required: true}
        }]
      }],
  isPrivate: {type: Boolean, default: false},
  accessList: [],
  description: String,
  votes: [{userEmail: String, vote: Number}],
  dateAdded: { type: Date, default: Date.now }
});

// Export the schema
module.exports = mongoose.model('Channel', channelSchema);

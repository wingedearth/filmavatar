var mongoose = require('mongoose');

var myChannelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  isCurator: Boolean,
});

// Export the schema
module.exports = mongoose.model('MyChannel', myChannelSchema);

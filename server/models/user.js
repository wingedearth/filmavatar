var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  email: {
    type:     String,
    unique:   true,
    required: true
  },
  handle: {
    type:    String,
    unique:  true,
    required: true
  },
  city:  String,
  state: String,
  zip:   String,
  myChannels: [{channelId: String, isCurator: Boolean, isCreator: Boolean}],
  isAdmin: { type: Boolean, default: false },
  created: { type: Date, default: Date.now }
});

userSchema.plugin(require('mongoose-bcrypt'));

// Export the schema
module.exports = mongoose.model('User', userSchema);

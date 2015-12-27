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
  city:  {type: String, default: 'Pasadena'},
  state: {type: String, default: 'CA'},
  zip:   {type: String, default: '91101'},
  myChannels: [{channelId: String, isCurator: Boolean, isCreator: Boolean}],
  isAdmin: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  password: {type: String, required: true, bcrypt: true}
});

userSchema.plugin(require('mongoose-bcrypt'));

// Export the schema
module.exports = mongoose.model('User', userSchema);

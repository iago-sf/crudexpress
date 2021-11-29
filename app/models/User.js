const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  creationDate: {
    type: Date,
    default: Date.now
  },
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
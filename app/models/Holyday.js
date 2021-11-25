const mongoose = require('mongoose');

const HolydaySchema = new mongoose.Schema({
  name: String,
  country: String,
  city: Array,
  emerge: Date,
  description: String
});

const Holyday = mongoose.model('holydays', HolydaySchema);

module.exports = Holyday;
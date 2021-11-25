const mongoose = require('mongoose');

const CitySchema = new mongoose.Schema({
  name: String,
  population: Number,
  country: String,
  indgLang: Boolean,
  coordenatex: Number,
  coordenatey: Number,
});

const City = mongoose.model('cities', CitySchema);

module.exports = City;
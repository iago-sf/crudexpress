const mongoose = require('mongoose');

const CountrySchema = new mongoose.Schema({
  name: String,
  continent: String,
  population: Number,
  language: String,
  age: Number,
  soberanity: Boolean
});

const Country = mongoose.model('countries', CountrySchema);

module.exports = Country;
const mongoose = require('mongoose');

const phoneSchema = new mongoose.Schema({
  name: String,
  brand: String,
  price: Number,
  image: String
});

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;

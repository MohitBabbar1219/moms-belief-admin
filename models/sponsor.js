const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sponsorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

module.exports = Sponsor = mongoose.model('sponsors', sponsorSchema);
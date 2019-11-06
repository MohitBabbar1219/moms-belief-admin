const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const introText = new Schema({
  text: {
    type: String,
    required: true
  }
});

module.exports = IntroText = mongoose.model('intro_text', introText);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mainBanner = new Schema({
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

module.exports = MainBanner = mongoose.model('main_banner', mainBanner);
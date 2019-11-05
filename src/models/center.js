const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const centerSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  doctor: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  address: {
    toShow: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    zipCode: {
      type: String,
      required: true
    },
  },
  thumbImage: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  services: [{
    type: String,
    required: true
  }],
  aboutDoctor: {
    type: String,
    required: true
  },
  strengths: [{
    number: {
      type: String,
      required: true
    },
    strength: {
      type: String,
      required: true
    },
  }],
  doctorImage: {
    type: String,
    required: true
  },
  imageOne: {
    type: String,
    required: true
  },
  imageTwo: {
    type: String,
    required: true
  },
  isFeatured: {
    type: Boolean,
    required: true
  }
});

module.exports = Center = mongoose.model('centers', centerSchema);
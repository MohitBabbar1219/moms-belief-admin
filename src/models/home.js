const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const centerSchema = new Schema({
  testimonials: [{
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  }],
  news: [{
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    link: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  mediaMentions: [{
    image: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
});

module.exports = Center = mongoose.model('centers', centerSchema);
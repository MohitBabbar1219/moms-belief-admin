const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schoolSchema = new Schema({
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
});

module.exports = School = mongoose.model('schools', schoolSchema);
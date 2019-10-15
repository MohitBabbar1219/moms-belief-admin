const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicalExpertSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
});

module.exports = ClinicalExpert = mongoose.model('clinical_expert', clinicalExpertSchema);
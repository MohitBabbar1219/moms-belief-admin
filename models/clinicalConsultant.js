const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clinicalConsultantSchema = new Schema({
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
  about: {
    type: String,
    required: true
  },
});

module.exports = ClinicalConsultants = mongoose.model('clinical_consultants', clinicalConsultantSchema);
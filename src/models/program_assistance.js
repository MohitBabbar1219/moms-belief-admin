const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const programAssistance = new Schema({
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
});

module.exports = ProgramAssistance = mongoose.model('program_assistances', programAssistance);
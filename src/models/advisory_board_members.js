const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const advisoryBoardMemberSchema = new Schema({
  name: {
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

module.exports = AdvisoryBoardMember = mongoose.model('avisory_board_members', advisoryBoardMemberSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const managementTeamMemberSchema = new Schema({
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

module.exports = ManagementTeamMember = mongoose.model('management_team_members', managementTeamMemberSchema);
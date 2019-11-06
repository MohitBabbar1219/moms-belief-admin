const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mediaMentionSchema = new Schema({
  text: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
});

module.exports = MediaMention = mongoose.model('media_mentions', mediaMentionSchema);
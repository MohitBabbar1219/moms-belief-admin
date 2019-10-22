const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityCenterCountSchema = new Schema({
  city: {
    type: String,
    required: true
  },
  count: {
    type: String,
    required: true
  },
});

module.exports = CityCenterCount = mongoose.model('city_center_counts', cityCenterCountSchema);
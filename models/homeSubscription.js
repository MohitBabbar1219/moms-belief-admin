const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  tier: {
    type: String,
    required: true
  }
});

module.exports = Subscription = mongoose.model('subscriptions', subscriptionSchema);
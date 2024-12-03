const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true
  },
  lat: Number,
  lng: Number,
  status: {
    type: String,
    enum: ['not_delivered', 'delivered', 'left_notice'],
    default: 'not_delivered'
  }
});

module.exports = mongoose.model('Address', AddressSchema);

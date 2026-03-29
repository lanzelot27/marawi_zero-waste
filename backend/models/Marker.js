const mongoose = require('mongoose');

const MarkerSchema = new mongoose.Schema({
  position: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  schedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Schedule',
    required: true,
  },
});

module.exports = mongoose.model('Marker', MarkerSchema);

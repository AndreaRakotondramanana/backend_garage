const mongoose = require('mongoose');

const GarageSchema = new mongoose.Schema({
  localisation: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  contact: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Garage', GarageSchema);
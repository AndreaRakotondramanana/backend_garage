const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  utilisateurId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  pseudo: { type: String, required: true },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  mail: { type: String, required: true },
  dtn: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);
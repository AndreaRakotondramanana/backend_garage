const mongoose = require('mongoose');

const VoitureSchema = new mongoose.Schema({
  clientId: {
    type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
    ref: 'Client', // Nom du modèle référencé
    required: true
  },
  model: { type: String, required: true },
  marque: { type: String, required: true }, 
  immatriculation: { type: String, required: true },
  annee: { type: Number, required: true },
  type: { type: String, enum: ['Essence', 'Diesel', 'Electrique'], required: true },
  taille: { type: String, enum: ['Citadine', '4x4', 'Berline', 'SUV'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Voiture', VoitureSchema);
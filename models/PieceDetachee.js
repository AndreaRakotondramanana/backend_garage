const mongoose = require('mongoose');

// Import du modèle de catégorie
const Categorie = require('./Categorie');

const PieceDetacheeSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  description: { type: String, required: true },
  quantite: { type: Number, required: true, default: 0 },
  prix: { type: Number, required: true }, 
  fournisseur: { type: String, required: true }, 
  categorie: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Categorie', 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model('PieceDetachee', PieceDetacheeSchema);
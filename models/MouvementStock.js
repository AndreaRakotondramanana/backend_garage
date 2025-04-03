const mongoose = require('mongoose');

const MouvementStockSchema = new mongoose.Schema({
  pieceDetachee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'PieceDetachee',  // Référence à la pièce détachée concernée
    required: true 
  },
  typeMouvement: { 
    type: String, 
    enum: ['entrée', 'sortie'], // Entrée ou sortie de stock
    required: true 
  },
  quantite: { 
    type: Number, 
    required: true 
  },
  utilisateur: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Utilisateur',  // Utilisateur ayant effectué l'opération
    required: true 
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  raison: { 
    type: String, 
    required: true  // Raison de l'entrée ou sortie (ex : vente, réapprovisionnement, etc.)
  }
}, { timestamps: true });

module.exports = mongoose.model('MouvementStock', MouvementStockSchema);

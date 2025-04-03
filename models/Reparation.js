const mongoose = require('mongoose');

const ReparationSchema = new mongoose.Schema(
  {
    vehiculeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vehicule', // Référence au véhicule concerné
      required: true,
    },
    description: { 
      type: String, 
      required: true, // Description de la réparation effectuée
    },
    date: { 
      type: Date, 
      required: true, 
    },
    piecesUtilisees: [
      {
        pieceDetachee: {
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'PieceDetachee', // Référence à une pièce détachée
          required: true,
        },
        quantite: {
          type: Number,
          required: true, // Quantité de la pièce utilisée
        },
      },
    ],
    montant: { 
      type: Number, 
      required: true, // Montant total de la réparation
    },
    mecanicienId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Utilisateur', // Mécanicien ayant effectué la réparation
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Reparation', ReparationSchema);

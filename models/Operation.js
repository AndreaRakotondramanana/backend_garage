const mongoose = require('mongoose');

const OperationSchema = new mongoose.Schema({
    rdvId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Rdv', // Nom du modèle référencé
        required: true
    },
    date_heure: { type: Date, required: true },
    statut: { type: String, enum: ['devis', 'reparation', 'historique'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Operation', OperationSchema);
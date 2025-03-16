const mongoose = require('mongoose');

const Detail_operationSchema = new mongoose.Schema({
    prestationId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Prestation', // Nom du modèle référencé
        required: true
    },
    operationId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Operation', // Nom du modèle référencé
        required: true
    },
    quantite: { type: Number, required: true },
    statut: { type: String, enum: ['En attente', 'En cours', 'Fait'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Detail_operation', Detail_operationSchema);
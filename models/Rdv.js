const mongoose = require('mongoose');

const RdvSchema = new mongoose.Schema({
    garageId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Garage', // Nom du modèle référencé
        required: true
    },
    voitureId: { 
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Voiture', // Nom du modèle référencé
        required: true
    },
    date_heure: { type: Date, required: true },
    note: { type: String, required: true },
    statut: { type: String, enum: ['valide', 'non valide', 'fait'], required: true, default: 'non valide' }
}, { timestamps: true });

module.exports = mongoose.model('Rdv', RdvSchema);
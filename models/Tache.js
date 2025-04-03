const mongoose = require('mongoose');

const TacheSchema = new mongoose.Schema({
    detailOperationId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Detail_operation', // Nom du modèle référencé
        required: true
    },
    mecanicienId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Mecanicien', // Nom du modèle référencé
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.model('Tache', TacheSchema);
const mongoose = require('mongoose');

const FormuleSchema = new mongoose.Schema({
    prestationId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Prestation', // Nom du modèle référencé
        required: true
    },
    formule: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Formule', FormuleSchema);
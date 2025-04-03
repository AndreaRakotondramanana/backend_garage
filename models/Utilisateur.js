const mongoose = require('mongoose');

const UtilisateurSchema = new mongoose.Schema({
    mail: { type: String, required: true },
    mdp: { type: String, required: true },
    role: { type: String, enum: ['client', 'mecanicien', 'manager'], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Utilisateur', UtilisateurSchema);
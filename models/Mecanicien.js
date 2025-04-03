const mongoose = require('mongoose');

const MecanicienSchema = new mongoose.Schema({
    utilisateurId: { 
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Utilisateur', // Nom du modèle référencé
        required: true
    },
    garageId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Garage', // Nom du modèle référencé
        required: true
    },
    categorieId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Categorie', // Nom du modèle référencé
        required: true  
    },
    pseudo: { type: String, required: true },
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    mail: { type: String, required: true },
    dtn: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Mecanicien', MecanicienSchema);
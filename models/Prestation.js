const mongoose = require('mongoose');

const PrestationSchema = new mongoose.Schema({
    categorieId: {
        type: mongoose.Schema.Types.ObjectId, // Référence à l'ID de l'utilisateur
        ref: 'Categorie', // Nom du modèle référencé
        required: true 
    },
    libelle_prestation: { type: String, required: true },
    prix_unitaire_base: { type: Number, required: true },
    duree: { type: Number, required: true } 
}, { timestamps: true }); 

module.exports = mongoose.model('Prestation', PrestationSchema); 
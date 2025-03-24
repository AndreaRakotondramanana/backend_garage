const mongoose = require('mongoose');

const PrestationSchema = new mongoose.Schema({
    categorieId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categorie', 
        required: true
    },
    libelle_prestation: { type: String, required: true },
    prix_unitaire_base: { type: Number, required: true },
    duree: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Prestation', PrestationSchema);
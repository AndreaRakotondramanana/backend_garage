const mongoose = require('mongoose');

const PrestationViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    libelle_prestation: String,
    prix_unitaire_base: Number,
    duree: Number,
    categorieId: mongoose.Schema.Types.ObjectId,
    libelle_categorie: String
}, { collection: 'prestationView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('PrestationView', PrestationViewSchema); 
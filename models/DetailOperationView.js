const mongoose = require('mongoose');

const DetailOperationViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    prestationId: mongoose.Schema.Types.ObjectId,
    quantite: Number,
    statut: String,
    libelle_prestation: String,
    prix_unitaire_base: Number,
    duree: Number,
    categorieId: mongoose.Schema.Types.ObjectId,
    libelle_categorie: String,
    operationId: mongoose.Schema.Types.ObjectId
}, { collection: 'DetailOperationView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('DetailOperationView', DetailOperationViewSchema);
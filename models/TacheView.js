const mongoose = require('mongoose');

const TacheViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    mecanicienId: mongoose.Schema.Types.ObjectId,
    pseudo_mecanicien: String,
    nom_mecanicien: String,
    prenom_mecanicien: Date,
    mail_mecanicien: String,
    categorieId: mongoose.Schema.Types.ObjectId,
    libelle_categorie: String,
    garageId: mongoose.Schema.Types.ObjectId,
    localisation_garage: String,
    detailOperationId: mongoose.Schema.Types.ObjectId,
    quantite: Number,
    statut: String,
    prestationId: mongoose.Schema.Types.ObjectId,
    libelle_prestation: String,
    prix_unitaire_base: Number,
    duree: Number,
    voitureId: mongoose.Schema.Types.ObjectId,
    model_voiture: String,
    marque_voiture: String,
    immatriculation_voiture: String,
    clientId: mongoose.Schema.Types.ObjectId,
    pseudo_client: String,
    nom_client: String,
    prenom_client: String,
    mail_client: String
}, { collection: 'TacheView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('TacheView', TacheViewSchema);
const mongoose = require('mongoose');

const MecanicienViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    pseudo: String,
    nom: String,
    prenom: String,
    mail: String,
    date_de_naissance: Date,
    garageId: mongoose.Schema.Types.ObjectId,
    localisation: String,
    categorieId: mongoose.Schema.Types.ObjectId,
    libelle_categorie: String
}, { collection: 'MecanicienView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('MecanicienView', MecanicienViewSchema);
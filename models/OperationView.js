const mongoose = require('mongoose');

const OperationViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    statut: String,
    date_heure: Date,
    voitureId: mongoose.Schema.Types.ObjectId,
    model: String,
    marque: String,
    immatriculation: String,
    garageId: mongoose.Schema.Types.ObjectId,
    localisation: String,
    clientId: mongoose.Schema.Types.ObjectId,
    nom: String,
    prenom: String
}, { collection: 'OperationView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('OperationView', OperationViewSchema);
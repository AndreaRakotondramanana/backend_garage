const mongoose = require('mongoose');

const RdvViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date_heure: Date,
    note: String,
    statut: String,
    garageId: mongoose.Schema.Types.ObjectId,
    localisation: String,
    voitureId: mongoose.Schema.Types.ObjectId,
    model: String,
    marque: String,
    immatriculation: String,
    clientId: mongoose.Schema.Types.ObjectId,
    pseudo: String,
    nom: String,
    prenom: String,
    mail: String
}, { collection: 'RdvView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('RdvView', RdvViewSchema);
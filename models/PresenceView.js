const mongoose = require('mongoose');

const PresenceViewSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: Date,
    mecanicienId: mongoose.Schema.Types.ObjectId,
    pseudo: String,
    garageId: mongoose.Schema.Types.ObjectId,
    nomGarage: String,
    categorieId: mongoose.Schema.Types.ObjectId,
    libelleCategorie: String
}, { collection: 'presenceView' }); // Spécifiez le nom de la vue ici

module.exports = mongoose.model('PresenceView', PresenceViewSchema);
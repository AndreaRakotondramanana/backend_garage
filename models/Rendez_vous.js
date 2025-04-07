const mongoose = require("mongoose");

const Rendez_vousSchema = new mongoose.Schema({
    date_rdv:{
        type: String, // YYYY-MM-DD
        required: true
    },
    heure_rdv:{
        type: String, // HH:mm
        required: true
    },
    clientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
    voitureId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voiture',
        required: true
    },
    garageId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Garage',
        required: false
    },
    message: {
        type: String,
        required: false
    },
    longitude: {
        type: Number,
        required: false,
    },
    latitude: {
        type: Number,
        required: false,
    },
    status: {
        type: String,
        enum: ['En attente de validation', 'Validé', 'Refusé'],
        default: 'En attente de validation'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rendez_vous', Rendez_vousSchema);
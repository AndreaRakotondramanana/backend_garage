const mongoose = require('mongoose');

const Mecanicien_TravailSchema = new mongoose.Schema({
    mecanicienId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mecanicien',
        required: true
    },
    detail_rendez_vousId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Detail_rendez_vous',
        required: true
    },
    date_heure:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['En attente', 'En cours', 'Terminé'],
        default: 'En attente'
    }
});

module.exports = mongoose.model('Mecanicien_Travail', Mecanicien_TravailSchema);
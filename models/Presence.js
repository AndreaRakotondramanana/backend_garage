const mongoose = require('mongoose');

const PresenceSchema = new mongoose.Schema({
    mecanicienId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mecanicien', // Référence au modèle Mecanicien
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    present: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('Presence', PresenceSchema);
const mongoose = require('mongoose');

const Detail_rendez_vousSchema = new mongoose.Schema({
    rendez_vousId: {
        type: mongoose.Types.ObjectId,
        ref: 'Rendez_vous',
        required : true
    },
    prestationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Prestation',
        required : true
    },
    status: {
        type: String,
        enum: ['En attente', 'En cours', 'Terminé'],
        default: 'En attente'
    }
});

module.exports = mongoose.model('Detail_rendez_vous', Detail_rendez_vousSchema);
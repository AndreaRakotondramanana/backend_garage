const mongoose = require('mongoose');

const detailReparationSchema = new mongoose.Schema({
    prestationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestation', required: true },
    libelle_prestation: { type: String, required: true },
    quantite: { type: Number, required: true, min: 1 },
    prix_unitaire_base: { type: Number, required: true, min: 0 },
    statut: { type: String, enum: ['En attente', 'En cours', 'Fait'], default: 'propose' },
    categorieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
}, { _id: false });

const reparationHistoSchema = new mongoose.Schema({
    operationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operation', 
        required: true
    },
    date_op: {
        type: Date,
        default: Date.now
    },
    rdvId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rdv',
        required: true
    },
    detailReparation: {
        details: [detailReparationSchema],
        total: { type: Number, required: true }
    }
}, { timestamps: true });

// Middleware pour calculer le total avant sauvegarde
reparationHistoSchema.pre('save', function (next) {
    if (this.detailReparation.details && this.detailReparation.details.length > 0) {
        this.detailReparation.total = this.detailReparation.details.reduce(
            (sum, presta) => sum + (presta.prix_unitaire * presta.quantite),
            0
        );
    }
    next();
});

module.exports = mongoose.model('Reparation_histo', reparationHistoSchema);
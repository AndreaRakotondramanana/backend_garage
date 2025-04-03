const mongoose = require('mongoose');

const detailDevisSchema = new mongoose.Schema({
    prestationId: { type: mongoose.Schema.Types.ObjectId, ref: 'Prestation', required: true },
    libelle_prestation: { type: String, required: true },
    quantite: { type: Number, required: true, min: 1 },
    prix_unitaire_base: { type: Number, required: true, min: 0 },
    categorieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Categorie' }
}, { _id: false });

const devisHistoSchema = new mongoose.Schema({
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
    detailDevis: {
        details: [detailDevisSchema],
        total: { type: Number, required: true }
    }
}, { timestamps: true });

// Middleware pour calculer le total avant sauvegarde
devisHistoSchema.pre('save', function (next) {
    if (this.detailDevis.details && this.detailDevis.details.length > 0) {
        this.detailDevis.total = this.detailDevis.details.reduce(
            (sum, presta) => sum + (presta.prix_unitaire * presta.quantite),
            0
        );
    }
    next();
});

module.exports = mongoose.model('Devis_histo', devisHistoSchema);
const mongoose = require('mongoose');

const OperationSchema = new mongoose.Schema({
    rdvId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rdv',
        required: true
    },
    date_heure: { type: Date, required: true }, 
    statut: { type: String, enum: ['devis', 'reparation', 'historique'], required: true },
    isSyncedToHistory: { type: Boolean, default: false } // Nouveau champ pour suivre la synchronisation
}, { timestamps: true });

// // Middleware post-save pour synchroniser avec Devis_histo
// OperationSchema.post('save', async function(doc) {
//     if (doc.statut === 'devis' && !doc.isSyncedToHistory) {
//         await syncOperationToHistory(doc);
//     }
// });

// // Middleware post-update
// OperationSchema.post('findOneAndUpdate', async function(doc) {
//     if (doc && doc.statut === 'devis' && !doc.isSyncedToHistory) {
//         await syncOperationToHistory(doc);
//     }
// });

// async function syncOperationToHistory(operation) {
//     const session = await mongoose.startSession();
//     session.startTransaction();
    
//     try {
//         const DetailOperation = mongoose.model('Detail_operation');
//         const DevisHisto = mongoose.model('Devis_histo');
        
//         // Récupérer les détails associés
//         const details = await DetailOperation.find({ operationId: operation._id })
//             .populate('prestationId')
//             .session(session);
        
//         // Transformer les détails en format pour Devis_histo
//         const detailDevis = {
//             details: details.map(d => ({
//                 prestationId: d.prestationId._id,
//                 libelle_prestation: d.prestationId.libelle_prestation,
//                 quantite: d.quantite,
//                 prix_unitaire_base: d.prestationId.prix_unitaire_base,
//                 categorieId: d.prestationId.id_categorie
//             })),
//             total: details.reduce((sum, d) => sum + (d.prestationId.prix_unitaire_base * d.quantite), 0)
//         };
        
//         // Créer ou mettre à jour l'entrée historique
//         await DevisHisto.findOneAndUpdate(
//             { operationId: operation._id },
//             {
//                 operationId: operation._id,
//                 rdvId: operation.rdvId,
//                 date_op: operation.date_heure,
//                 detailDevis: detailDevis
//             },
//             { upsert: true, new: true, session }
//         );
        
//         // Marquer comme synchronisé
//         await mongoose.model('Operation').findByIdAndUpdate(
//             operation._id,
//             { isSyncedToHistory: true },
//             { session }
//         );
        
//         await session.commitTransaction();
//     } catch (error) {
//         await session.abortTransaction();
//         console.error('Erreur synchronisation historique:', error);
//     } finally {
//         session.endSession();
//     }
// }

module.exports = mongoose.model('Operation', OperationSchema);
const mongoose = require('mongoose');

const Detail_operationSchema = new mongoose.Schema({
    prestationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prestation',
        required: true 
    },
    operationId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Operation', 
        required: true
    },
    quantite: { type: Number, required: true },
    statut: { type: String, enum: ['En attente', 'En cours', 'Fait'], required: true }
}, { timestamps: true });

// // Middleware post-save pour synchroniser avec Devis_histo
// Detail_operationSchema.post('save', async function(doc) {
//     const Operation = mongoose.model('Operation');
//     const operation = await Operation.findById(doc.operationId);
    
//     if (operation && operation.statut === 'devis') {
//         await syncOperationToHistory(operation);
//     }
// });

// // Middleware post-remove
// Detail_operationSchema.post('remove', async function(doc) {
//     const Operation = mongoose.model('Operation');
//     const operation = await Operation.findById(doc.operationId);
    
//     if (operation && operation.statut === 'devis') {
//         await syncOperationToHistory(operation);
//     }
// });

// // Réutilisez la même fonction syncOperationToHistory que dans Operation.js
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

module.exports = mongoose.model('Detail_operation', Detail_operationSchema);
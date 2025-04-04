const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Operation = require('../models/Operation');
const Detail_operation = require('../models/Detail_operation');
const Rdv = require('../models/Rdv'); // Assurez-vous d'importer le modèle Rdv

// Créer une opération
router.post('/', async (req, res) => {
    try {
        const operation = new Operation(req.body);
        await operation.save();
        res.status(201).send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Créer un devis avec ses détails
router.post('/devis', async (req, res) => {
    try {
        const { rdvId, prestations } = req.body;

        // Validation des données
        if (!mongoose.Types.ObjectId.isValid(rdvId)) {
            return res.status(400).json({ message: 'ID de rendez-vous invalide' });
        }

        if (!prestations || prestations.length === 0) {
            return res.status(400).json({ message: 'Aucune prestation fournie' });
        }

        // 1. Créer l'opération (devis)
        const operation = new Operation({
            rdvId,
            date_heure: new Date(),
            statut: 'devis'
        });
        const savedOperation = await operation.save();

        // 2. Créer les détails d'opération
        const detailsOperations = prestations.map(presta => ({
            prestationId: presta.prestationId,
            operationId: savedOperation._id,
            quantite: presta.quantite,
            statut: 'En attente'
        }));

        await Detail_operation.insertMany(detailsOperations);

        // 3. Mettre à jour le statut du RDV
        const updatedRdv = await Rdv.findByIdAndUpdate(
            rdvId,
            { statut: 'valide' },
            { new: true }
        );

        if (!updatedRdv) {
            return res.status(404).json({ message: 'Rendez-vous non trouvé' });
        }

        res.status(201).json({
            message: 'Devis créé avec succès et RDV mis à jour',
            operation: savedOperation,
            detailsOperations,
            rdv: updatedRdv
        });

    } catch (error) {
        console.error('Erreur lors de la création du devis:', error);
        res.status(500).json({
            message: 'Erreur lors de la création du devis',
            error: error.message
        });
    }
});

// Lire toutes les opérations
router.get('/', async (req, res) => {
    try {
        const operations = await Operation.find().populate('rdvId');
        res.send(operations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre une opération comme historique (terminer)
router.get('/mas/:operationId', async (req, res) => {
    try {
        const operationId = req.params.operationId;

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(operationId)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // Trouver et mettre à jour l'entrée de présence
        const operation = await Operation.findOneAndUpdate(
            { _id: operationId }, // Utiliser _id au lieu de id
            { statut: "historique" },
            { new: true } // Retourner la présence mise à jour
        );

        if (!operation) {
            return res.status(404).json({ message: "Présence non trouvée" });
        }

        res.status(200).json(operation);
        // res.send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire une opération par ID
router.get('/:id', async (req, res) => {
    try {
        const operation = await Operation.findById(req.params.id).populate('rdvId');
        if (!operation) return res.status(404).send();
        res.send(operation);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une opération
router.put('/:id', async (req, res) => {
    try {
        const operation = await Operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!operation) return res.status(404).send();
        res.send(operation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une opération
router.delete('/:id', async (req, res) => {
    try {
        const operation = await Operation.findByIdAndDelete(req.params.id);
        if (!operation) return res.status(404).send();
        res.send(operation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
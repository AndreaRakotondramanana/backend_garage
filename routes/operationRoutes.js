const express = require('express');
const router = express.Router();
const Operation = require('../models/Operation');

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

// Lire toutes les opérations
router.get('/', async (req, res) => {
    try {
        const operations = await Operation.find().populate('rdvId');
        res.send(operations);
    } catch (error) {
        res.status(500).send(error);
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
router.patch('/:id', async (req, res) => {
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
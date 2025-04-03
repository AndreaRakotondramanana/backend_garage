const express = require('express');
const router = express.Router();
const Formule = require('../models/Formule');

// Créer une formule
router.post('/', async (req, res) => {
    try {
        const formule = new Formule(req.body);
        await formule.save();
        res.status(201).send(formule);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire toutes les formules
router.get('/', async (req, res) => {
    try {
        const formules = await Formule.find().populate('prestationId');
        res.send(formules);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire une formule par ID
router.get('/:id', async (req, res) => {
    try {
        const formule = await Formule.findById(req.params.id).populate('prestationId');
        if (!formule) return res.status(404).send();
        res.send(formule);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour une formule
router.put('/:id', async (req, res) => {
    try {
        const formule = await Formule.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!formule) return res.status(404).send();
        res.send(formule);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une formule
router.delete('/:id', async (req, res) => {
    try {
        const formule = await Formule.findByIdAndDelete(req.params.id);
        if (!formule) return res.status(404).send();
        res.send(formule);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
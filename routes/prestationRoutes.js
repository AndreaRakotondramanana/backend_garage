const express = require('express');
const router = express.Router();
const Prestation = require('../models/Prestation');

// Créer une prestation
router.post('/', async (req, res) => {
    try {
        const prestation = new Prestation(req.body);
        await prestation.save();
        res.status(201).send(prestation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire toutes les prestations
router.get('/', async (req, res) => {
    try {
        const prestations = await Prestation.find().populate('categorieId');
        res.send(prestations);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire une prestation par ID
router.get('/:id', async (req, res) => {
    try {
        const prestation = await Prestation.find({ categorieId: req.params.id }).populate('categorieId');
        if (!prestation) return res.status(404).send();
        res.send(prestation);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.put('/:id', async (req, res) => {
    try {
        const prestation = await Prestation.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!prestation) return res.status(404).send();
        res.send(prestation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer une prestation
router.delete('/:id', async (req, res) => {
    try {
        const prestation = await Prestation.findByIdAndDelete(req.params.id);
        if (!prestation) return res.status(404).send();
        res.send(prestation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
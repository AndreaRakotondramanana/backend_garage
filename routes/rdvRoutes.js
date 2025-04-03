const express = require('express');
const router = express.Router();
const Rdv = require('../models/Rdv');

// Créer un rendez-vous
router.post('/', async (req, res) => {
    try {
        const rdv = new Rdv(req.body);
        await rdv.save();
        res.status(201).send(rdv);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire tous les rendez-vous
router.get('/', async (req, res) => {
    try {
        const rdvs = await Rdv.find().populate('garageId voitureId');
        res.send(rdvs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire un rendez-vous par ID
router.get('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findById(req.params.id).populate('garageId voitureId');
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un rendez-vous
router.put('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findByIdAndDelete(req.params.id);
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
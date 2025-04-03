const express = require('express');
const router = express.Router();
const Tache = require('../models/Tache');

// Créer un tache
router.post('/', async (req, res) => {
    try {
        const tache = new Tache(req.body);
        await tache.save();
        res.status(201).send(tache);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire tous les taches
router.get('/', async (req, res) => {
    try {
        const taches = await Tache.find().populate('detailOperationId mecanicienId');
        res.send(taches);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire un tache par ID
router.get('/:id', async (req, res) => {
    try {
        const tache = await Tache.findById(req.params.id).populate('detailOperationId mecanicienId');
        if (!tache) return res.status(404).send();
        res.send(tache);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un tache
router.put('/:id', async (req, res) => {
    try {
        const tache = await Tache.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!tache) return res.status(404).send();
        res.send(tache);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un tache
router.delete('/:id', async (req, res) => {
    try {
        const tache = await Tache.findByIdAndDelete(req.params.id);
        if (!tache) return res.status(404).send();
        res.send(tache);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
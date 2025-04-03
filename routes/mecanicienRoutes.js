
const express = require("express");
const router = express.Router();
const authManager = require("../middlewares/authManager");
const mecanicienTravailController = require('../controllers/mecanicienController');

router.post('/assignation', authManager, mecanicienTravailController.assignerTravail);

// Créer un mécanicien
router.post('/', async (req, res) => {
    try {
        const mecanicien = new Mecanicien(req.body);
        await mecanicien.save();
        res.status(201).send(mecanicien);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Lire tous les mécaniciens
router.get('/', async (req, res) => {
    try {
        const mecaniciens = await Mecanicien.find().populate('utilisateurId garageId categorieId');
        res.send(mecaniciens);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire un mécanicien par ID
router.get('/:id', async (req, res) => {
    try {
        const mecanicien = await Mecanicien.findById(req.params.id).populate('utilisateurId garageId categorieId');
        if (!mecanicien) return res.status(404).send();
        res.send(mecanicien);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un mécanicien
router.put('/:id', async (req, res) => {
    try {
        const mecanicien = await Mecanicien.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!mecanicien) return res.status(404).send();
        res.send(mecanicien);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un mécanicien
router.delete('/:id', async (req, res) => {
    try {
        const mecanicien = await Mecanicien.findByIdAndDelete(req.params.id);
        if (!mecanicien) return res.status(404).send();
        res.send(mecanicien);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
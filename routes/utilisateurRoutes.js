const express = require('express');
const router = express.Router();
const Utilisateur = require('../models/Utilisateur');

// Créer un utilisateur
router.post('/', async (req, res) => {
    try {
        const utilisateur = new Utilisateur(req.body);
        await utilisateur.save();
        res.status(201).json(utilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les utilisateur 
router.get('/', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.find();
        res.json(utilisateur);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un utilisateur
router.put('/:id', async (req, res) => {
    try {
        const utilisateur = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(utilisateur);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}); 

// Supprimer un utilisateur
router.delete('/:id', async (req, res) => {
    try {
        await Utilisateur.findByIdAndDelete(req.params.id);
        res.json({ message: "Utilisateur supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
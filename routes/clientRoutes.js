const express = require('express');
const router = express.Router();
const Client = require('../models/Client'); // Importe le modèle Client

// Créer un client
router.post('/', async (req, res) => {
    try {
        const client = new Client(req.body);
        await client.save();
        res.status(201).json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Lire tous les clients
router.get('/', async (req, res) => {
    try {
        const clients = await Client.find().populate('utilisateurId'); // Récupère les clients avec les infos de l'utilisateur
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire un client par son ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id).populate('utilisateurId'); // Récupère le client avec les infos de l'utilisateur
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un client
router.put('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('utilisateurId'); // Met à jour et renvoie le client avec les infos de l'utilisateur
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json(client);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un client
router.delete('/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json({ message: "Client supprimé" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
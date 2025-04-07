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
        const clients = await Client.find().populate('utilisateurId'); 
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const client = await Client.findOne({ utilisateurId: req.params.id }); 
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findOne({ utilisateurId: req.params.id }).select('_id'); 
        if (!client) {
            return res.status(404).json({ message: "Client non trouvé" });
        }
        res.json({ clientId: client._id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Mettre à jour un client
router.put('/modifier/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
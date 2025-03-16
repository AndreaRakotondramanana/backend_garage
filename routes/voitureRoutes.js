const express = require('express');
const router = express.Router();
const Voiture = require('../models/Voiture'); // Importe le modèle Voiture

// Créer une voiture
router.post('/', async (req, res) => {
  try {
    const voiture = new Voiture(req.body);
    await voiture.save();
    res.status(201).json(voiture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire toutes les voitures
router.get('/', async (req, res) => {
  try {
    const voitures = await Voiture.find().populate('clientId'); // Récupère les voitures avec les infos du client
    res.json(voitures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une voiture par son ID
router.get('/:id', async (req, res) => {
  try {
    const voiture = await Voiture.findById(req.params.id).populate('clientId'); // Récupère la voiture avec les infos du client
    if (!voiture) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.json(voiture);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour une voiture
router.put('/:id', async (req, res) => {
  try {
    const voiture = await Voiture.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('clientId'); // Met à jour et renvoie la voiture avec les infos du client
    if (!voiture) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.json(voiture);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer une voiture
router.delete('/:id', async (req, res) => {
  try {
    const voiture = await Voiture.findByIdAndDelete(req.params.id);
    if (!voiture) {
      return res.status(404).json({ message: "Voiture non trouvée" });
    }
    res.json({ message: "Voiture supprimée" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const MecanicienView = require('../models/MecanicienView'); // Importe le modèle mecanicienView

// Lire toutes les catégories
router.get('/', async (req, res) => {
  try {
    const mecanicienViews = await MecanicienView.find();
    res.json(mecanicienViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une catégorie par son ID
router.get('/:id', async (req, res) => {
  try {
    const mecanicienView = await MecanicienView.findById(req.params.id);
    if (!mecanicienView) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json(mecanicienView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
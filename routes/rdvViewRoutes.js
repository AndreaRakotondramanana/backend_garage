const express = require('express');
const router = express.Router();
const RdvView = require('../models/RdvView'); // Importe le modèle RdvView

// Lire toutes les catégories
router.get('/', async (req, res) => {
  try {
    const rdvViews = await RdvView.find();
    res.json(rdvViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire les rendez-vous de diagnostic non effectués
router.get('/rdv-faire', async (req, res) => {
  try {
    // Recherche des RDV avec statut "non valide"
    const rdvsNonEffectues = await RdvView.find({ 
      statut: "non valide"  // Pas besoin de $ne ici si vous voulez exactement "non valide"
    });

    res.json(rdvsNonEffectues); 
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une catégorie par son ID
router.get('/:id', async (req, res) => {
  try {
    const rdvView = await RdvView.findById(req.params.id);
    if (!rdvView) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }
    res.json(rdvView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
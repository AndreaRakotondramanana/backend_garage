const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Importez mongoose
const PrestationView = require('../models/PrestationView'); // Importe le modèle PrestationView

// Lire toutes les prestations
router.get('/', async (req, res) => {
  try {
    const prestationViews = await PrestationView.find();
    res.json(prestationViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une prestation par son ID
router.get('/:id', async (req, res) => {
  try {
    const prestationView = await PrestationView.findById(req.params.id);
    if (!prestationView) {
      return res.status(404).json({ message: "Prestation non trouvée" });
    }
    res.json(prestationView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire toutes les prestations d'une catégorie spécifique par categorieId
router.get('/categorie/:categorieId', async (req, res) => {
  try {
    const categorieId = req.params.categorieId;

    // Vérifier si l'ID de la catégorie est valide
    if (!mongoose.Types.ObjectId.isValid(categorieId)) {
      return res.status(400).json({ message: "ID de catégorie invalide" });
    }

    // Rechercher les prestations associées à cette catégorie
    const prestations = await PrestationView.find({ categorieId: categorieId });

    if (prestations.length === 0) {
      return res.status(404).json({ });
    }

    res.json(prestations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
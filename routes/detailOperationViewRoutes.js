const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Importez mongoose
const DetailOperationView = require('../models/DetailOperationView'); // Importe le modèle DetailOperationView

// Lire toutes les catégories
router.get('/', async (req, res) => {
  try {
    const detailOperationViews = await DetailOperationView.find();
    res.json(detailOperationViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une DetailOperationView par son ID
router.get('/:id', async (req, res) => {
  try {
    const detailOperationView = await DetailOperationView.findById(req.params.id);
    if (!detailOperationView) {
      return res.status(404).json({ message: "Detail Operation non trouvée" });
    }
    res.json(detailOperationView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une DetailOperationView par l'ID operation
router.get('/operation/:operationId', async (req, res) => {
    try {
        const operationId = req.params.operationId;

        // Vérifier si l'ID de la catégorie est valide
        if (!mongoose.Types.ObjectId.isValid(operationId)) {
            return res.status(400).json({ message: "ID de operation invalide" });
        }

        // Rechercher les detailOperationViews associées à cette catégorie
        const detailOperationViews = await DetailOperationView.find({ operationId: operationId });

        if (detailOperationViews.length === 0) {
            return res.status(404).json({ });
        }

        res.json(detailOperationViews);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
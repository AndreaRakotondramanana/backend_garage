const express = require('express');
const router = express.Router();
const OperationView = require('../models/OperationView'); // Importe le modèle OperationView

// Lire toutes les operationViews
router.get('/', async (req, res) => {
  try {
    const operationViews = await OperationView.find();
    res.json(operationViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire les operationViews avec statut != historique
router.get('/cours', async (req, res) => {
  try {
    const operationViews = await OperationView.find({ statut: { $ne: 'historique' } });
    res.json(operationViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire une operationViews par son ID
router.get('/:id', async (req, res) => {
  try {
    const operationView = await OperationView.findById(req.params.id);
    if (!operationView) {
      return res.status(404).json({ message: "OperationView non trouvée" });
    }
    res.json(operationView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
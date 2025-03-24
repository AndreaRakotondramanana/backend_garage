const express = require('express');
const router = express.Router();
const Garage = require('../models/Garage'); 

// Créer un garage
router.post('/', async (req, res) => {
  try {
    const garage = new Garage(req.body);
    await garage.save();
    res.status(201).json(garage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Lire tous les garages
router.get('/', async (req, res) => {
  try {
    const garages = await Garage.find();
    res.json(garages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire un garage par son ID
router.get('/:id', async (req, res) => {
  try {
    const garage = await Garage.findById(req.params.id);
    if (!garage) {
      return res.status(404).json({ message: "Garage non trouvé" });
    }
    res.json(garage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mettre à jour un garage
router.put('/:id', async (req, res) => {
  try {
    const garage = await Garage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!garage) {
      return res.status(404).json({ message: "Garage non trouvé" });
    }
    res.json(garage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Supprimer un garage
router.delete('/:id', async (req, res) => {
  try {
    const garage = await Garage.findByIdAndDelete(req.params.id);
    if (!garage) {
      return res.status(404).json({ message: "Garage non trouvé" });
    }
    res.json({ message: "Garage supprimé" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
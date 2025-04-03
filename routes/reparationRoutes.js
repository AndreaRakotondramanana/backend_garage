const express = require("express");
const router = express.Router();
const Reparation = require("../models/Reparation");

// ✅ Ajouter une réparation pour un véhicule
router.post("/", async (req, res) => {
  try {
    const { vehiculeId, description, date, piecesUtilisees, montant, mecanicienId } = req.body;
    const newReparation = new Reparation({ vehiculeId, description, date, piecesUtilisees, montant, mecanicienId });
    await newReparation.save();
    res.status(201).json({ message: "Réparation ajoutée avec succès", newReparation });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout de la réparation", error });
  }
});

// ✅ Récupérer l'historique des réparations d'un véhicule
router.get("/:vehiculeId", async (req, res) => {
  try {
    const { vehiculeId } = req.params;
    const reparations = await Reparation.find({ vehiculeId });
    res.status(200).json(reparations);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des réparations", error });
  }
});

module.exports = router;

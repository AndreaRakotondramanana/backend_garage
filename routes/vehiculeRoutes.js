const express = require("express");
const router = express.Router();
const Vehicule = require("../models/Vehicule");
const authClient = require("../middlewares/authClient");

// ✅ Ajouter un véhicule pour un client
router.post("/", authClient, async (req, res) => {
  try {
    const { clientId, marque, modele, immatriculation, annee, type } = req.body;
    const newVehicule = new Vehicule({ clientId, marque, modele, immatriculation, annee, type });
    await newVehicule.save();
    res.status(201).json({ message: "Véhicule ajouté avec succès", newVehicule });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout du véhicule", error });
  }
});

// ✅ Récupérer tous les véhicules d'un client
router.get("/:clientId", authClient, async (req, res) => {
  try {
    const { clientId } = req.params;
    const vehicules = await Vehicule.find({ clientId });
    res.status(200).json(vehicules);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des véhicules", error });
  }
});

module.exports = router;
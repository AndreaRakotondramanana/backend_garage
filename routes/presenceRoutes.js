const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Presence = require('../models/Presence'); // Importer le modèle Presence
const Mecanicien = require('../models/Mecanicien'); // Importer le modèle Mecanicien

// Créer une entrée de présence pour tous les mécaniciens existants
router.get('/create-for-all', async (req, res) => {
    try {
        // Récupérer tous les mécaniciens
        const mecaniciens = await Mecanicien.find();

        // Date du jour (sans l'heure)
        const today = new Date().toString();
        // today.setHours(0, 0, 0, 0);

        // Pour chaque mécanicien, créer une entrée de présence pour la journée
        for (const mecanicien of mecaniciens) {
            // Vérifier si une entrée de présence existe déjà pour ce mécanicien aujourd'hui
            const existingPresence = await Presence.findOne({
                mecanicienId: mecanicien._id,
                date: { $gte: today }
            });

            if (!existingPresence) {
                // Créer une nouvelle entrée de présence
                const presence = new Presence({
                    mecanicienId: mecanicien._id,
                    date: today,
                    present: true // Par défaut, le mécanicien est marqué comme present
                });
                await presence.save();
            }
        }

        res.status(201).json({ message: 'Entrées de présence créées pour tous les mécaniciens.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire toutes les presences
router.get('/', async (req, res) => {
  try {
    const presences = await Presence.find().populate('mecanicienId');
    res.json(presences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// router.get('/all', async (req, res) => {
//     try {
//       const presences = await Presence.find().populate('mecanicienId');
//       res.json(presences);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
// });

// Marquer l'absence d'un mécanicien
router.get('/mark-absent/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Vérifier si l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "ID invalide" });
        }

        // Trouver et mettre à jour l'entrée de présence
        const presence = await Presence.findOneAndUpdate(
            { _id: id }, // Utiliser _id au lieu de id
            { present: false },
            { new: true } // Retourner la présence mise à jour
        );

        if (!presence) {
            return res.status(404).json({ message: "Présence non trouvée" });
        }

        res.status(200).json(presence);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Recuperer pour aujourd'hui
router.get('/for-today', async (req, res) => {
    try {
        // Date du jour (sans l'heure)
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Définir l'heure à minuit
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1); // Minuit du lendemain

        // Récupérer les présences pour aujourd'hui où `present` est `true`
        const presences = await Presence.find({ 
            date: tomorrow, // Filtrer par date du jour
            present: true // Filtrer par présence
        }).populate('mecanicienId'); // Remplir les détails du mécanicien

        res.status(200).json(presences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Recuperer pour une date donnee
router.get('/for-date/:date', async (req, res) => {
    try {
        const { date } = req.params; // Extraire la date des paramètres de l'URL

        // Convertir la date en objet Date
        const targetDate = new Date(date);
        if (isNaN(targetDate.getTime())) {
            return res.status(400).json({ message: "Format de date invalide. Utilisez YYYY-MM-DD." });
        }
        targetDate.setHours(0, 0, 0, 0); // Définir l'heure à minuit

        // Récupérer les présences pour la date spécifiée
        const presences = await Presence.find({ date: targetDate })
            .populate('mecanicienId'); // Remplir les détails du mécanicien

        res.status(200).json(presences);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer l'historique des présences pour un mécanicien
// router.get('/history', async (req, res) => {
//     try {
//         const { mecanicienId, startDate, endDate } = req.query;

//         const query = { mecanicienId };
//         if (startDate && endDate) {
//             query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
//         }

//         // Récupérer l'historique des présences
//         const presences = await Presence.find(query)
//             .populate('mecanicienId'); // Remplir les détails du mécanicien

//         res.status(200).json(presences);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// });

module.exports = router;
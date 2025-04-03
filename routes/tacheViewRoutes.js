const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // Importez mongoose
const TacheView = require('../models/TacheView'); // Importe le modèle TacheView

// Lire toutes les catégories
router.get('/', async (req, res) => {
    try {
        const tacheViews = await TacheView.find();
        res.json(tacheViews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire une catégorie par son ID
router.get('/:id', async (req, res) => {
    try {
        const tacheView = await TacheView.findById(req.params.id);
        if (!tacheView) {
            return res.status(404).json({ message: "Catégorie non trouvée" });
        }
        res.json(tacheView);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Lire toutes les tâches non faites par un mécanicien spécifique
router.get('/mecanicien-pending/:mecanicienId', async (req, res) => {
    try {
        const mecanicienId = req.params.mecanicienId;

        // Vérification de l'ID
        if (!mongoose.Types.ObjectId.isValid(mecanicienId)) {
            return res.status(400).json({ 
                success: false,
                message: "ID de mécanicien invalide"  
            });
        }

        // Recherche des tâches NON faites (statut différent de "Fait")
        const tachesNonFaites = await TacheView.find({ 
            statut: { $ne: "Fait" },  // $ne = not equal
            mecanicienId: mecanicienId 
        });

        res.json(tachesNonFaites);
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Erreur serveur",
            error: error.message 
        });
    }
});

module.exports = router;
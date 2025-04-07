const express = require('express');
const router = express.Router();
const Rdv = require('../models/Rdv');
const Operation = require('../models/Operation');

// Créer un rendez-vous
router.post('/', async (req, res) => {
    try {
        const { date_heure, voitureId, garageId, note } = req.body;

        console.log("Données reçues pour le rendez-vous:", req.body);

        const dateParsed = new Date(date_heure);
        if (isNaN(dateParsed.getTime())) {
            return res.status(400).json({ message: 'Date ou heure invalide' });
        }

        // Création du rendez-vous
        const rendezVous = new Rdv({
            date_heure: dateParsed,
            voitureId,
            garageId,
            note
        });

        await rendezVous.save();

        // Création de l'opération
        const detail = new Operation({
            rdvId: rendezVous._id,
            date_heure: dateParsed,
            statut: "devis"
        });

        await detail.save();

        return res.status(201).json({ message: 'Rendez-vous créé avec succès', rendezVousId: rendezVous._id });
    } catch (error) {
        console.error('Erreur lors de la création du rendez-vous:', error);
        return res.status(500).json({ message: 'Erreur serveur' });
    }
});

// Lire tous les rendez-vous
router.get('/', async (req, res) => {
    try {
        const rdvs = await Rdv.find().populate('garageId voitureId');
        res.send(rdvs);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire un rendez-vous par ID
router.get('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findById(req.params.id).populate('garageId voitureId');
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Mettre à jour un rendez-vous
router.put('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Supprimer un rendez-vous
router.delete('/:id', async (req, res) => {
    try {
        const rdv = await Rdv.findByIdAndDelete(req.params.id);
        if (!rdv) return res.status(404).send();
        res.send(rdv);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
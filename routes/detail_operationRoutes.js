const express = require('express');
const router = express.Router();
const Detail_operation = require('../models/Detail_operation');

// Créer un détail d'opération
router.post('/', async (req, res) => {
    try {
        const detail_operation = new Detail_operation(req.body);
        await detail_operation.save();
        res.status(201).send(detail_operation);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Inserer un nouveau devis
// router.post('/', async (req, res) => {
//     try {
//         const detail_operation = new Detail_operation(req.body);
//         await detail_operation.save();
//         res.status(201).send(detail_operation);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// Lire tous les détails d'opération
router.get('/', async (req, res) => {
    try {
        const details_operation = await Detail_operation.find().populate('prestationId operationId');
        res.send(details_operation);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Lire un détail d'opération par ID
router.get('/:id', async (req, res) => {
    try {
        const detail_operation = await Detail_operation.findById(req.params.id).populate('prestationId operationId');
        if (!detail_operation) return res.status(404).send();
        res.send(detail_operation);
    } catch (error) {
        res.status(500).send(error);
    }
});

router.patch('/taches/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { statut } = req.body;
  
      if (!['En attente', 'En cours', 'Fait'].includes(statut)) {
        return res.status(400).json({ message: 'Statut invalide' });
      }
  
      const tacheMaj = await Detail_operation.findByIdAndUpdate(
        id,
        { statut },
        { new: true }
      );
  
      res.json(tacheMaj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// Mettre à jour un détail d'opération
// router.put('/:id', async (req, res) => {
//     try {
//         const detail_operation = await Detail_operation.findByIdAndUpdate(req.params.id, req.body, { new: true });
//         if (!detail_operation) return res.status(404).send();
//         res.send(detail_operation);
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });

// Supprimer un détail d'opération
router.delete('/:id', async (req, res) => {
    try {
        const detail_operation = await Detail_operation.findByIdAndDelete(req.params.id);
        if (!detail_operation) return res.status(404).send();
        res.send(detail_operation);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
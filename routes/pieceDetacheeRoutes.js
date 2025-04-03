const express = require("express");
const router = express.Router();
const PieceDetachee = require("../models/PieceDetachee");
const authManager = require("../middleware/authManager");

// ✅ Route pour ajouter une pièce détachée
router.post("/pieces", authManager, async (req, res) => {
  try {
    const { nom, description, quantite, prix, fournisseur, categorieId } =
      req.body;

    // Vérification de l'existence de la catégorie
    const categorie = await Categorie.findById(categorieId);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    const piece = new PieceDetachee({
      nom,
      description,
      quantite,
      prix,
      fournisseur,
      categorie: categorieId,
    });

    await piece.save();
    res.status(201).json({ message: "Pièce ajoutée avec succès", piece });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de l'ajout de la pièce détachée",
      error: err,
    });
  }
});

// ✅ Route pour récupérer toutes les pièces détachées
router.get("/pieces", authManager, async (req, res) => {
  try {
    const pieces = await PieceDetachee.find().populate("categorie"); // Remplissage de la catégorie
    res.status(200).json(pieces);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des pièces détachées",
      error: err,
    });
  }
});

// ✅ Route pour mettre à jour une pièce détachée
router.put("/pieces/:id", authManager, async (req, res) => {
  try {
    const { nom, description, quantite, prix, fournisseur, categorieId } =
      req.body;

    // Vérification de la catégorie
    const categorie = await Categorie.findById(categorieId);
    if (!categorie) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    const updatedPiece = await PieceDetachee.findByIdAndUpdate(
      req.params.id,
      {
        nom,
        description,
        quantite,
        prix,
        fournisseur,
        categorie: categorieId,
      },
      { new: true }
    );

    if (!updatedPiece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }

    res
      .status(200)
      .json({ message: "Pièce mise à jour avec succès", updatedPiece });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la mise à jour de la pièce détachée",
        error: err,
      });
  }
});

// ✅ Route pour supprimer une pièce détachée
router.delete("/pieces/:id", authManager, async (req, res) => {
  try {
    const deletedPiece = await PieceDetachee.findByIdAndDelete(req.params.id);
    if (!deletedPiece) {
      return res.status(404).json({ message: "Pièce détachée non trouvée" });
    }
    res
      .status(200)
      .json({ message: "Pièce détachée supprimée avec succès", deletedPiece });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Erreur lors de la suppression de la pièce détachée",
        error: err,
      });
  }
});

// ✅ Route pour ajouter un mouvement de stock (entrée ou sortie)
router.post('/mouvements', authManager, async (req, res) => {
    try {
      const { pieceDetacheeId, typeMouvement, quantite, utilisateurId, raison } = req.body;
  
      // Vérification de l'existence de la pièce détachée
      const piece = await PieceDetachee.findById(pieceDetacheeId);
      if (!piece) {
        return res.status(404).json({ message: 'Pièce détachée non trouvée' });
      }
  
      // Vérification de l'existence de l'utilisateur
      const utilisateur = await Utilisateur.findById(utilisateurId);
      if (!utilisateur) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
  
      // Mise à jour de la quantité de stock en fonction du type de mouvement
      if (typeMouvement === 'entrée') {
        piece.quantite += quantite;
      } else if (typeMouvement === 'sortie') {
        if (piece.quantite < quantite) {
          return res.status(400).json({ message: 'Quantité insuffisante en stock' });
        }
        piece.quantite -= quantite;
      } else {
        return res.status(400).json({ message: 'Type de mouvement invalide' });
      }
  
      await piece.save();
  
      // Enregistrement du mouvement de stock
      const mouvement = new MouvementStock({
        pieceDetachee: pieceDetacheeId,
        typeMouvement,
        quantite,
        utilisateur: utilisateurId,
        raison
      });
  
      await mouvement.save();
  
      res.status(201).json({ message: 'Mouvement de stock enregistré avec succès', mouvement });
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de l\'ajout du mouvement de stock', error: err });
    }
  });

  // ✅ Route pour récupérer les mouvements de stock
router.get('/mouvements', authManager, async (req, res) => {
    try {
      const { pieceDetacheeId, utilisateurId } = req.query; // Optionnel : filtrer par pièce ou utilisateur
  
      let filter = {};
  
      if (pieceDetacheeId) {
        filter.pieceDetachee = pieceDetacheeId;
      }
  
      if (utilisateurId) {
        filter.utilisateur = utilisateurId;
      }
  
      const mouvements = await MouvementStock.find(filter)
        .populate('pieceDetachee')  // Remplir la référence à la pièce détachée
        .populate('utilisateur')    // Remplir la référence à l'utilisateur
        .sort({ date: -1 });        // Trier par date (les plus récents d'abord)
  
      res.status(200).json(mouvements);
    } catch (err) {
      res.status(500).json({ message: 'Erreur lors de la récupération des mouvements de stock', error: err });
    }
  });
  
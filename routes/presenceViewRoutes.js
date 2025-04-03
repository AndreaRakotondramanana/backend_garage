const express = require('express');
const router = express.Router();
const PresenceView = require('../models/PresenceView'); // Importe le modèle PresenceView

// Lire toutes les presences de ce jour
router.get('/', async (req, res) => {
  try {
    // Obtenir la date du jour (début et fin)
    const todayStr = new Date().toISOString().split('T')[0]; // "yyyy-mm-dd"

    const presenceViews = await PresenceView.find({
      $expr: {
        $eq: [
          { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          todayStr
        ]
      }
    });

    res.json(presenceViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lire toutes les presences
router.get('/all', async (req, res) => {
  try {
    const presenceViews = await PresenceView.find();
    res.json(presenceViews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); 

// Lire une presences par son ID
router.get('/:id', async (req, res) => {
  try {
    const presenceView = await PresenceView.findById(req.params.id);
    if (!presenceView) {
      return res.status(404).json({ message: "Presence non trouvée" });
    }
    res.json(presenceView);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// stat pour toutes les dates
router.get('/stats/daily', async (req, res) => {
  try {
    const stats = await PresenceView.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          day: "$_id.day",
          count: 1
        }
      },
      { $sort: { year: 1, month: 1, day: 1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// stat pour tous les mois
router.get('/stats/monthly', async (req, res) => {
  try {
    const stats = await PresenceView.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          month: "$_id.month",
          count: 1
        }
      },
      { $sort: { year: 1, month: 1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// stat pour toutes les annees
router.get('/stats/yearly', async (req, res) => {
  try {
    const stats = await PresenceView.aggregate([
      {
        $group: {
          _id: { year: { $year: "$date" } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          year: "$_id.year",
          count: 1
        }
      },
      { $sort: { year: 1 } }
    ]);
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
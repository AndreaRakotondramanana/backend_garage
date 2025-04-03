const express = require('express');
const router = express.Router();
const rendezVousController = require('../controllers/rendez_vousController');
const authClient = require('../middlewares/authClient');
const authManager = require('../middlewares/authManager');

router.post('/prendre', authClient, rendezVousController.createRendezVous);
router.get('/mes-rendez-vous', authClient, rendezVousController.getMesRendezVous);


// manager
router.post('/validation-rendez-vous', authManager, rendezVousController.validerRendezVous);

module.exports = router;
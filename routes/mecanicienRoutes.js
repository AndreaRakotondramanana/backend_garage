const express = require("express");
const router = express.Router();
const authManager = require("../middlewares/authManager");
const mecanicienTravailController = require('../controllers/mecanicienController');

router.post('/assignation', authManager, mecanicienTravailController.assignerTravail);

module.exports = router;
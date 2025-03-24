const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

// Inscription
router.post("/register", async (req, res) => {
  try {
    const { username, email, password} = req.body;

    // Vérifier si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email déjà utilisé" });

    //   // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    role = "client";

    user = new User({ username, email, password, role});
    await user.save();

    res.status(201).json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    let user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Utilisateur non trouvé" });

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Mot de passe incorrect" });

    // Générer le token JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
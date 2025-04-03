const Client = require("../models/Client");
const User = require("../models/Utilisateur");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const { username, email, password, pseudo, nom, prenom, dtn } = req.body;
    // Debug: Afficher les données reçues
    console.log("Données reçues :", req.body);

    // Validation obligatoire
    if (!password || typeof password !== "string") {
      return res.status(400).json({ error: "Le mot de passe est invalide" });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer l'utilisateur
    const user = new User({
      username,
      email,
      password: hashedPassword,
      role: 0, // 0 = client
    });
    await user.save();

    // Créer le client associé
    const client = new Client({
      utilisateurId: user._id,
      pseudo,
      nom,
      prenom,
      mail: email, // ou mail si différent
      dtn: new Date(dtn),
    });
    await client.save();

    res.status(201).json({ message: "Inscription réussie !" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Trouver l'utilisateur
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// login manager 
exports.loginManager = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Email ou mot de passe incorrect" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

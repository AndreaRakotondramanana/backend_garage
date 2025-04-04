
const mongoose = require("mongoose");

const UtilisateurSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Utilisateur", UtilisateurSchema);

const mongoose = require("mongoose");

const VehiculeSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client", // Référence à l'id du client
      required: true,
    },
    marque: { type: String, required: true },
    modele: { type: String, required: true },
    immatriculation: { type: String, required: true, unique: true },
    annee: { type: Number, required: true },
    type: { type: String, required: true }, // Ex: Berline, SUV, etc.
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicule", VehiculeSchema);

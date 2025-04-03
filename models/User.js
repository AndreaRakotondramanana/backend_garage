const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["Client", "Mécanicien", "Manager"],
    default: "Client",
  },
});

module.exports = mongoose.model("User", UserSchema);
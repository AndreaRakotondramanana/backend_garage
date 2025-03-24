require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// connexion mongodb
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Atlas connecté'))
  .catch(err => console.error('❌ Erreur de connexion à MongoDB :', err));

// Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/client', require('./routes/clientRoutes'));
app.use('/api/garage', require('./routes/garageRoutes'));
app.use('/api/categorie', require('./routes/categorieRoutes'));
app.use('/api/prestation', require('./routes/prestationRoutes'));
app.use('/api/rendez_vous', require('./routes/rendez_vousRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
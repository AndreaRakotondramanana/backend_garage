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

// Routes Andréa 
app.use('/utilisateur', require('./routes/utilisateurRoutes'));
app.use('/client', require('./routes/clientRoutes'));
app.use('/voiture', require('./routes/voitureRoutes'));
app.use('/garage', require('./routes/garageRoutes'));
app.use('/categorie', require('./routes/categorieRoutes'));
app.use('/mecanicien', require('./routes/mecanicienRoutes'));
app.use('/rdv', require('./routes/rdvRoutes'));
app.use('/operation', require('./routes/operationRoutes'));
app.use('/prestation', require('./routes/prestationRoutes'));
app.use('/formule', require('./routes/formuleRoutes'));
app.use('/detail_operation', require('./routes/detail_operationRoutes'));
app.use('/mecanicienView', require('./routes/mecanicienViewRoutes'));
app.use('/prestationView', require('./routes/prestationViewRoutes'));
app.use('/presence', require('./routes/presenceRoutes'));
app.use('/presenceView', require('./routes/presenceViewRoutes'));
app.use('/operationView', require('./routes/operationViewRoutes'));

// Fin Routes Andréa 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur démarré sur le port ${PORT}`));
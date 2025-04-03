const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer TOKEN"
    
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 0) { // Vérifie si c'est un client (role = 0)
        return res.status(403).json({ message: 'Accès réservé aux clients' });
      }
      req.user = decoded; // Stocke les infos utilisateur
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide ou expiré' });
    }
  };
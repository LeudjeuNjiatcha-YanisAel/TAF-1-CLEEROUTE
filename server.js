const express = require('express');
const path = require('path');
const cors = require('cors');
const apps = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Middleware globaux
apps.use(cors()); // Active CORS pour toutes les requêtes (sécurité cross-origin)
apps.use(express.json()); // Permet de parser le corps JSON des requêtes entrantes
apps.use(express.static(path.join(__dirname, 'public'))); // Sert les fichiers statiques du dossier public (frontend)

// Documentation de l'API (Swagger UI) accessible sur /api-docs
apps.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Montage des routes de l'API Articles
const articleRoutes = require('./Routes/articleRoutes');
apps.use('/api/articles', articleRoutes);

// Route par défaut servant l'application SPA Frontend
apps.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Middleware centralisé de gestion d'erreurs globales
apps.use((err, req, res, next) => {
    console.error("🔥 Erreur globale interceptée :", err.stack);
    res.status(500).json({ message: "Une erreur interne est survenue sur le serveur." });
});

// Lancement du serveur sur le port 3000
const PORT = 3000;
apps.listen(PORT, () => {
    console.log(`🚀 Serveur démarré avec succès sur : http://localhost:${PORT}`);
    console.log(`📖 Documentation interactive de l'API Swagger : http://localhost:${PORT}/api-docs`);
});
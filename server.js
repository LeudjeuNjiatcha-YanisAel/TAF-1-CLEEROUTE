
// const express = require('express');
// const apps = express();
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger');


// // permet de lire json dans les requetes
// apps.use(express.json());
// apps.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// const articleRoutes = require('./Routes/articleRoutes');

// apps.use('/api/articles',articleRoutes);


// apps.listen(3000,() =>{
//     console.log('Serveur Lance Sur http://localhost:3000');
// });

const express = require('express');
const path = require('path');
const apps = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// Middleware
apps.use(express.json());
apps.use(express.static(path.join(__dirname, 'public')));

// Swagger
apps.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes API
const articleRoutes = require('./Routes/articleRoutes');
apps.use('/api/articles', articleRoutes);

// Frontend — toutes les autres routes servent index.html
apps.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Gestion erreurs globales
apps.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur interne du serveur" });
});

apps.listen(3000, () => {
    console.log('✅ Serveur lancé sur http://localhost:3000');
    console.log('📖 Swagger sur http://localhost:3000/api-docs');
});
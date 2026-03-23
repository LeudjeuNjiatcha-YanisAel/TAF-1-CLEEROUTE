// Installe npm install express mysql2 cors body-parser

const express = require('express');
const apps = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');


// permet de lire json dans les requetes
apps.use(express.json());
apps.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const articleRoutes = require('./Routes/articleRoutes');

apps.use('/api/articles',articleRoutes);


apps.listen(3000,() =>{
    console.log('Serveur Lance Sur https://localhost:3000');
});


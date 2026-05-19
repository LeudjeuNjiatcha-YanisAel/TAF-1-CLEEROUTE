const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: '📖 Machine Blog API Documentation',
      version: '1.1.0',
      description: 'API REST moderne, robuste et documentée sous spécification OpenAPI 3.0, servant de backend pour la plateforme Machine Blog. Permet d\'effectuer des opérations CRUD complètes, des recherches par mots-clés ainsi que des filtrages multicritères sur les articles.',
      contact: {
        name: 'Support Technique CLEEROUTE',
        url: 'https://cleeroute.com',
        email: 'dev@cleeroute.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Serveur de Développement Local'
      }
    ]
  },
  apis: ['./Routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
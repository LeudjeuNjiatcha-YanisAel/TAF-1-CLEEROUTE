const express = require('express');
const router = express.Router();
const cont = require('../Controllers/articleController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - titre
 *         - auteur
 *       properties:
 *         id:
 *           type: integer
 *           description: L'identifiant unique généré automatiquement pour l'article.
 *           example: 1
 *         titre:
 *           type: string
 *           description: Le titre de l'article.
 *           example: "Introduction à Node.js"
 *         auteur:
 *           type: string
 *           description: L'auteur de l'article.
 *           example: "Jean Dupont"
 *         contenu:
 *           type: string
 *           description: Le contenu textuel détaillé de l'article.
 *           example: "Node.js est un environnement d'exécution JavaScript..."
 *         categorie:
 *           type: string
 *           description: La catégorie de l'article pour le filtrage.
 *           example: "Tech"
 *         tags:
 *           type: string
 *           description: Mots-clés ou tags associés à l'article, séparés par des virgules.
 *           example: "node, express, mysql"
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: Date et heure de création de l'article.
 *           example: "2026-05-19T14:32:00Z"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Message d'erreur explicatif.
 *           example: "Article introuvable"
 */

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Récupérer tous les articles
 *     description: Récupère la liste complète de tous les articles triés par date de création décroissante.
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: Liste des articles récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/', cont.getAll);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Créer un nouvel article
 *     description: Ajoute un nouvel article au blog. Les champs 'titre' et 'auteur' sont obligatoires.
 *     tags: [Articles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titre
 *               - auteur
 *             properties:
 *               titre:
 *                 type: string
 *                 description: Titre de l'article.
 *                 example: "Découvrir Swagger"
 *               auteur:
 *                 type: string
 *                 description: Nom de l'auteur.
 *                 example: "Jane Doe"
 *               contenu:
 *                 type: string
 *                 description: Contenu textuel.
 *                 example: "Swagger permet de documenter les API REST..."
 *               categorie:
 *                 type: string
 *                 description: Catégorie de l'article.
 *                 example: "Documentation"
 *               tags:
 *                 type: string
 *                 description: Liste de tags séparés par des virgules.
 *                 example: "api, documentation, node"
 *     responses:
 *       201:
 *         description: Article créé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 42
 *                 message:
 *                   type: string
 *                   example: "Article créé avec succès !"
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: Données d'entrée invalides ou manquantes.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', cont.create);

/**
 * @swagger
 * /api/articles/search:
 *   get:
 *     summary: Rechercher des articles par mots-clés
 *     description: Recherche des articles dont le titre, le contenu ou les tags correspondent au motif de recherche fourni.
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         description: Le texte à rechercher dans les articles.
 *         schema:
 *           type: string
 *           example: "Node"
 *     responses:
 *       200:
 *         description: Liste des articles correspondants.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       400:
 *         description: Paramètre de recherche manquant ou vide.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/search', cont.search);

/**
 * @swagger
 * /api/articles/filter:
 *   get:
 *     summary: Filtrer les articles par catégorie ou date
 *     description: Filtre la liste des articles selon la catégorie spécifiée ou la date de création exacte.
 *     tags: [Articles]
 *     parameters:
 *       - in: query
 *         name: categorie
 *         description: Nom de la catégorie à filtrer.
 *         schema:
 *           type: string
 *           example: "Tech"
 *       - in: query
 *         name: date
 *         description: Date de création au format YYYY-MM-DD.
 *         schema:
 *           type: string
 *           format: date
 *           example: "2026-05-19"
 *     responses:
 *       200:
 *         description: Liste filtrée des articles.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/filter', cont.filter);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Obtenir un article par son ID
 *     description: Récupère les détails complets d'un seul article identifié par son ID unique.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérique de l'article à récupérer.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Article trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: ID invalide.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Article introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:id', cont.getById);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Mettre à jour un article existant
 *     description: Modifie les informations d'un article existant. Seuls les champs envoyés dans le corps de la requête seront mis à jour.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérique de l'article à mettre à jour.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titre:
 *                 type: string
 *                 example: "Titre Mis à Jour"
 *               auteur:
 *                 type: string
 *                 example: "Auteur Modifié"
 *               contenu:
 *                 type: string
 *                 example: "Nouveau contenu mis à jour..."
 *               categorie:
 *                 type: string
 *                 example: "Nouveau Genre"
 *               tags:
 *                 type: string
 *                 example: "tags, mis, a, jour"
 *     responses:
 *       200:
 *         description: Article mis à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article mis à jour avec succès !"
 *                 article:
 *                   $ref: '#/components/schemas/Article'
 *       400:
 *         description: ID ou données de mise à jour invalides.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Article introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.put('/:id', cont.update);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Supprimer un article
 *     description: Supprime définitivement un article du blog par son ID.
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID numérique de l'article à supprimer.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Article supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Article supprimé avec succès !"
 *       400:
 *         description: ID invalide.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Article non trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erreur interne du serveur.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.delete('/:id', cont.delete);

module.exports = router;
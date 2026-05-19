# Machine Blog — Plateforme de Gestion d'Articles

Machine Blog est une application web monopage (SPA) moderne et performante conçue avec **Node.js, Express et MySQL**. Elle permet de rédiger, d'organiser, de filtrer et d'éditer des articles de blog à travers une interface utilisateur haut de gamme dotée d'une API REST entièrement documentée avec **Swagger (OpenAPI 3.0)**.

---

## Fonctionnalités Majeures

### Frontend (Interface Utilisateur)

* **Design Premium Sombre :** Esthétique épurée avec glassmorphism, effets de flou arrière-plan (backdrop-filter) et dégradés harmonieux.
* **Tags/Pills Dynamiques :** Génération automatique de boutons de filtrage pour les catégories populaires, colorés de manière unique grâce à un algorithme de hachage HSL.
* **Temps de lecture estimé :** Calcul en temps réel du temps nécessaire pour lire un article en se basant sur le nombre de mots.
* **Avatars d'Auteurs :** Génération automatique d'avatars circulaires basés sur les initiales de l'auteur.
* **Modals Personnalisés :** Remplacement des fenêtres d'avertissement par défaut du navigateur (comme `confirm`) par des overlays de dialogue animés et interactifs.
* **Système de Notification (Toasts) :** Toasts animés avec barre de progression de fermeture pour avertir l'utilisateur des succès/erreurs.
* **Entièrement Responsive :** Adaptabilité optimisée pour mobiles, tablettes et ordinateurs de bureau.

### Backend (Serveur & API)

* **Pool de Connexions MySQL :** Transition vers `mysql.createPool` pour éliminer les déconnexions intempestives de la base de données et optimiser la gestion des requêtes concurrentes.
* **Validation Robuste des Données :** Validation des champs requis (`titre`, `auteur`) lors de la création et de la mise à jour pour empêcher le stockage de données corrompues.
* **Gestion d'Erreur Sécurisée :** Remplacement du renvoi d'erreurs SQL brutes au client par des messages JSON anonymisés afin d'éviter la fuite d'informations sensibles sur la structure de la table.
* **Support CORS :** Intégration du middleware `cors` pour permettre aux clients distants de requérir l'API sans blocage de sécurité.

---

## Structure du Projet

```text
TAF-1-CLEEROUTE/
├── Database/
│   └── db.js                 # Configuration du pool de connexion MySQL
├── Models/
│   └── articleModel.js       # Opérations de base de données (SQL Queries)
├── Controllers/
│   └── articleController.js  # Logique métier, validations et gestionnaires HTTP
├── Routes/
│   └── articleRoutes.js      # Définition des endpoints & Documentation Swagger
├── public/
│   └── index.html            # Application SPA Frontend (HTML, CSS, JS)
├── CREATION BD               # Script SQL pour initialiser la base de données
├── server.js                 # Point d'entrée de l'application Express
├── swagger.js                # Configuration globale de Swagger
├── package.json              # Dépendances et métadonnées du projet
└── README.md                 # Documentation du projet (ce fichier)
```

---

## Configuration de la Base de Données

1. Assurez-vous que le serveur MySQL est installé et actif sur votre machine.
2. Ouvrez votre terminal MySQL (ou un outil d'administration comme phpMyAdmin / DBeaver).
3. Exécutez le script SQL contenu dans le fichier `CREATION BD` :

```sql
-- Crée la base de données
CREATE DATABASE blog_db;

-- Crée un utilisateur de base de données dédié
CREATE USER 'api_user'@'localhost' IDENTIFIED BY '';

-- Accorde tous les privilèges sur la base de données à cet utilisateur
GRANT ALL PRIVILEGES ON blog_db.* TO 'api_user'@'localhost';

-- Crée la table articles
USE blog_db;
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  auteur VARCHAR(100) NOT NULL,
  contenu TEXT,
  categorie VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Installation et Lancement

### 1. Cloner ou ouvrir le projet dans votre workspace

Rendez-vous dans le répertoire racine du projet.

### 2. Installer les dépendances

Installez les packages Node.js listés dans le fichier `package.json` :
```bash
npm install
```

### 3. Configurer les scripts npm (Optionnel)

Vous pouvez ajouter un script d'exécution dans votre `package.json` pour lancer le serveur plus facilement :
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### 4. Démarrer le serveur

Démarrez l'application :
```bash
node server.js
```

Le terminal affichera :
```text
Base de données MySQL connectée avec succès (via Pool) !
Serveur démarré avec succès sur : http://localhost:3000
Documentation interactive de l'API Swagger : http://localhost:3000/api-docs
```

---

### Synthèse des Endpoints

| Méthode | Route | Description | Paramètres de requête (Query) / Corps (Body) |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/articles` | Récupérer tous les articles triés par date | *Aucun* |
| **GET** | `/api/articles/:id` | Récupérer un article par son ID unique | `id` *(Path)* |
| **POST** | `/api/articles` | Créer un nouvel article | Body JSON : `{ titre, auteur, contenu, categorie }` |
| **PUT** | `/api/articles/:id` | Mettre à jour un article existant | `id` *(Path)*, Body JSON : `{ titre, auteur, contenu, categorie }` |
| **DELETE**| `/api/articles/:id` | Supprimer définitivement un article | `id` *(Path)* |
| **GET** | `/api/articles/search` | Rechercher des articles par mots-clés | `query` *(Query string)* |
| **GET** | `/api/articles/filter` | Filtrer par catégorie et/ou par date | `categorie` *(Query string)*, `date` *(Query string, YYYY-MM-DD)* |

---

## Stack Technique

* **Serveur / API :** Node.js, Express.js
* **Base de données :** MySQL (Driver `mysql2`)
* **Documentation API :** Swagger-UI-Express, Swagger-JSDoc (OpenAPI v3)
* **Frontend :** HTML5, CSS3 Moderne (Glassmorphism & Flexbox/Grid), JavaScript Vanilla ES6+

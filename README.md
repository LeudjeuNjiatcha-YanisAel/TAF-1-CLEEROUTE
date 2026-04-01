# Blog API – Application complète (Backend + Frontend)

## Description

Cette application est une API backend accompagnée d’une interface frontend permettant de gérer les articles d’un blog.

Elle permet d’effectuer les opérations CRUD (Create, Read, Update, Delete), ainsi que des fonctionnalités de recherche et de filtrage.

Le backend est développé avec Node.js et Express, et utilise MySQL comme base de données.  
Le frontend est une interface web simple développée en HTML, CSS et JavaScript.

---

## Technologies utilisées

### Backend
- Node.js
- Express
- MySQL
- Swagger (documentation API)

### Frontend
- HTML
- CSS
- JavaScript (Fetch API)

---

## Installation

### 1. Cloner le projet

```bash
git clone <lien_du_depot>
cd blog-api


### 2. Installer les dépendances (backend)
```bash
npm install

Configuration de la base de données
1. Créer la base de données
CREATE DATABASE blog_db;
2. Créer la table articles
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titre VARCHAR(255),
    contenu TEXT,
    auteur VARCHAR(255),
    date DATE,
    categorie VARCHAR(255),
    tags VARCHAR(255)
);
3. Configurer la connexion

Dans le fichier config/db.js :

const db = mysql.createConnection({
    host: 'localhost',
    user: 'api_user',
    password: '',
    database: 'blog_db'
});
Lancement de l’application
Backend
node server.js

Le serveur sera disponible sur :

http://localhost:3000
Frontend

Ouvrir le fichier :

frontend/index.html

dans le navigateur.

Endpoints de l’API
Créer un article
Méthode : POST
URL : /api/articles
{
  "titre": "Mon article",
  "contenu": "Contenu de l'article",
  "auteur": "Nom",
  "categorie": "Tech",
  "tags": "nodejs,api",
  "date": "2026-03-18"
}
Récupérer tous les articles
Méthode : GET
URL : /api/articles
Récupérer un article par ID
Méthode : GET
URL : /api/articles/{id}
Modifier un article
Méthode : PUT
URL : /api/articles/{id}
Supprimer un article
Méthode : DELETE
URL : /api/articles/{id}
Rechercher des articles
Méthode : GET
URL :
/api/articles/search?query=texte
Filtrer les articles
Méthode : GET
URL :
/api/articles/filter?categorie=Tech
Documentation API

L’API est documentée avec Swagger.

Accès :

http://localhost:3000/api-docs

Cette interface permet de visualiser et tester les endpoints.

Utilisation du frontend

Le frontend permet :

d’ajouter un article
d’afficher les articles
de supprimer un article
de rechercher des articles
de filtrer les articles par catégorie

Il communique avec le backend via des requêtes HTTP (Fetch API).

Structure du projet
blog-api/
│
├──
│   ├── Database/
│   ├── Models/
│   ├── Controllers/
│   ├── Routes/
│   ├── swagger.js
│   └── server.js
│   ├── public/
│      ├── index.html
Tests

L’API peut être testée avec :

Swagger UI
Postman
Navigateur (GET)

Le frontend permet également de tester toutes les fonctionnalités.

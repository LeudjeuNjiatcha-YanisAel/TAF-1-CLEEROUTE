const model = require('../Models/articleModel');

/**
 * Récupère tous les articles du blog.
 */
exports.getAll = (req, res) => {
    model.getAllArticles((err, results) => {
        if (err) {
            console.error("❌ Erreur dans getAllArticles :", err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la récupération des articles." });
        }
        res.status(200).json(results);
    });
};

/**
 * Récupère un article spécifique par son identifiant unique.
 */
exports.getById = (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "L'identifiant de l'article doit être un nombre valide." });
    }
    
    model.getArticle(id, (err, results) => {
        if (err) {
            console.error(`❌ Erreur dans getArticle (ID: ${id}) :`, err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la récupération de l'article." });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "L'article demandé est introuvable." });
        }
        res.status(200).json(results[0]);
    });
};

/**
 * Met à jour un article existant avec validation des données.
 */
exports.update = (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "L'identifiant de l'article doit être un nombre valide." });
    }

    const { titre, auteur, contenu, categorie, tags } = req.body;
    
    // Validation
    if (titre !== undefined && titre.trim() === "") {
        return res.status(400).json({ message: "Le titre de l'article ne peut pas être vide." });
    }
    if (auteur !== undefined && auteur.trim() === "") {
        return res.status(400).json({ message: "Le nom de l'auteur ne peut pas être vide." });
    }

    // Préparation des données de mise à jour (nettoyage)
    const updateData = {};
    if (titre !== undefined) updateData.titre = titre.trim();
    if (auteur !== undefined) updateData.auteur = auteur.trim();
    if (contenu !== undefined) updateData.contenu = contenu.trim();
    if (categorie !== undefined) updateData.categorie = categorie.trim();
    if (tags !== undefined) updateData.tags = tags.trim();

    if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ message: "Aucune donnée fournie pour la mise à jour." });
    }

    model.updateArticle(id, updateData, (err, result) => {
        if (err) {
            console.error(`❌ Erreur dans updateArticle (ID: ${id}) :`, err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la mise à jour de l'article." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "L'article à modifier n'existe pas." });
        }
        res.status(200).json({ 
            message: "L'article a été mis à jour avec succès !", 
            article: { id: parseInt(id), ...updateData } 
        });
    });
};

/**
 * Supprime un article par son ID.
 */
exports.delete = (req, res) => {
    const id = req.params.id;
    if (!id || isNaN(id)) {
        return res.status(400).json({ message: "L'identifiant de l'article doit être un nombre valide." });
    }
    
    model.deleteArticle(id, (err, result) => {
        if (err) {
            console.error(`❌ Erreur dans deleteArticle (ID: ${id}) :`, err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la suppression de l'article." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "L'article à supprimer n'existe pas." });
        }
        res.status(200).json({ message: "L'article a été supprimé avec succès !" });
    });
};

/**
 * Recherche des articles par mots-clés dans le titre, le contenu ou les tags.
 */
exports.search = (req, res) => {
    const query = req.query.query;
    if (!query || query.trim() === "") {
        return res.status(400).json({ message: "Le terme de recherche est manquant ou vide." });
    }
    
    model.searchArticles(query.trim(), (err, results) => {
        if (err) {
            console.error("❌ Erreur dans searchArticles :", err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la recherche." });
        }
        res.status(200).json(results);
    });
};

/**
 * Filtre les articles par catégorie ou par date exacte.
 */
exports.filter = (req, res) => {
    const { categorie, date } = req.query;
    const filters = {};
    if (categorie && categorie.trim() !== "") filters.categorie = categorie.trim();
    if (date && date.trim() !== "") filters.date = date.trim();

    model.filterArticles(filters, (err, results) => {
        if (err) {
            console.error("❌ Erreur dans filterArticles :", err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors du filtrage." });
        }
        res.status(200).json(results);
    });
};

/**
 * Crée un nouvel article.
 */
exports.create = (req, res) => {
    const { titre, auteur, contenu, categorie, tags } = req.body;
    
    // Validation stricte
    if (!titre || titre.trim() === "") {
        return res.status(400).json({ message: "Le titre de l'article est obligatoire." });
    }
    if (!auteur || auteur.trim() === "") {
        return res.status(400).json({ message: "Le nom de l'auteur est obligatoire." });
    }

    const data = {
        titre: titre.trim(),
        auteur: auteur.trim(),
        contenu: contenu ? contenu.trim() : "",
        categorie: (categorie && categorie.trim() !== "") ? categorie.trim() : "Général",
        tags: tags ? tags.trim() : "",
        date: new Date() // Maintient la compatibilité avec la colonne "date"
    };

    model.createArticle(data, (err, result) => {
        if (err) {
            console.error("❌ Erreur dans createArticle :", err);
            return res.status(500).json({ message: "Une erreur interne est survenue lors de la création de l'article." });
        }
        res.status(201).json({ 
            id: result.insertId, 
            message: "L'article a été créé avec succès !",
            article: { id: result.insertId, ...data, created_at: new Date() }
        });
    });
};
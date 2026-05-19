const db = require('../Database/db');

/**
 * Insère un nouvel article dans la base de données.
 */
exports.createArticle = (data, callback) => {
    const sql = "INSERT INTO articles SET ?";
    db.query(sql, data, callback);
};

/**
 * Récupère tous les articles, triés par date de création décroissante.
 */
exports.getAllArticles = (callback) => {
    db.query("SELECT * FROM articles ORDER BY created_at DESC, id DESC", callback);
};

/**
 * Récupère un unique article par son ID.
 */
exports.getArticle = (id, callback) => {
    db.query("SELECT * FROM articles WHERE id=?", [id], callback);
};

/**
 * Met à jour un article existant avec les nouvelles données.
 */
exports.updateArticle = (id, data, callback) => {
    db.query("UPDATE articles SET ? WHERE id=?", [data, id], callback);
};

/**
 * Supprime un article par son ID.
 */
exports.deleteArticle = (id, callback) => {
    db.query("DELETE FROM articles WHERE id=?", [id], callback);
};

/**
 * Recherche des articles contenant le terme dans le titre, le contenu ou les tags.
 */
exports.searchArticles = (query, callback) => {
    db.query(
        "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ? OR tags LIKE ? ORDER BY created_at DESC",
        [`%${query}%`, `%${query}%`, `%${query}%`],
        callback
    );
};

/**
 * Filtre les articles par catégorie et/ou par date.
 * Gère à la fois le champ moderne created_at et le champ hérité date pour la compatibilité.
 */
exports.filterArticles = (filters, callback) => {
    let sql = "SELECT * FROM articles WHERE 1=1";
    let values = [];

    if (filters.categorie) {
        sql += " AND categorie=?";
        values.push(filters.categorie);
    }

    if (filters.date) {
        // Recherche sur created_at ou sur l'ancien champ date
        sql += " AND (DATE(created_at)=? OR date=?)";
        values.push(filters.date, filters.date);
    }

    sql += " ORDER BY created_at DESC, id DESC";
    db.query(sql, values, callback);
};
const db = require('../Database/db');

exports.createArticle = (data, callback) => {
    const sql = "INSERT INTO articles SET ?";
    db.query(sql, data, callback);
};

exports.getAllArticles = (callback) => {
    db.query("SELECT * FROM articles ORDER BY created_at DESC", callback);
};

exports.getArticle = (id, callback) => {
    db.query("SELECT * FROM articles WHERE id=?", [id], callback);
};

exports.updateArticle = (id, data, callback) => {
    db.query("UPDATE articles SET ? WHERE id=?", [data, id], callback);
};

exports.deleteArticle = (id, callback) => {
    db.query("DELETE FROM articles WHERE id=?", [id], callback);
};

exports.searchArticles = (query, callback) => {
    db.query(
        "SELECT * FROM articles WHERE titre LIKE ? OR contenu LIKE ?",
        [`%${query}%`, `%${query}%`],
        callback
    );
};

exports.filterArticles = (filters, callback) => {
    let sql = "SELECT * FROM articles WHERE 1=1";
    let values = [];

    if (filters.categorie) {
        sql += " AND categorie=?";
        values.push(filters.categorie);
    }

    if (filters.date) {
        sql += " AND DATE(created_at)=?";
        values.push(filters.date);
    }

    sql += " ORDER BY created_at DESC";
    db.query(sql, values, callback);
};
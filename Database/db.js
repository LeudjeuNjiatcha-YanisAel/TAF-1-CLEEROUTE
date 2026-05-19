const mysql = require('mysql2');

// Création du pool de connexion pour une meilleure robustesse et gestion des reconnexions
const pool = mysql.createPool({
    host: 'localhost',
    user: 'api_user',
    password: '',
    database: 'blog_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test de connexion initial
pool.getConnection((err, connection) => {
    if (err) {
        console.error("❌ Erreur de connexion à la base de données (MySQL) :", err.message);
    } else {
        console.log("✅ Base de données MySQL connectée avec succès (via Pool) !");
        connection.release();
    }
});

module.exports = pool;

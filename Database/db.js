const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'api_user',
    password: '',
    database: 'blog_db'
});

db.connect(err => {
    if(err) {
        console.error("Erreur de connexion à la base de données :", err.message);
        return;
    }
    console.log("Base De Donnees MySQL connectee ✅");
});

module.exports = db;


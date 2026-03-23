const mysql = require('mysql2');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'article_db'
});

db.connect(err => {
    if(err) throw err;
    console.log("Base De Donnees MySQL connecte");
});

module.exports = db;
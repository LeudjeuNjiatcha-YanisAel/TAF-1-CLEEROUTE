const bd = require('../Database/db');

exports.createArticle = (data,callback) => {
    const sql = "INSERT INTO articles SET ?";
    // ? securite (anti injection SQL)
    db.query(sql,data,callback);
};

exports.getAllArticles = (callback) =>{
    db.query("SELECT * FROM articles",callback);
};

exports.getArticle = (id,callback) =>{
    db.query("SELECT * FROM articles WHERE id=?",[id],callback);
    
};

exports.updateArticle = (id,data,callback) =>{
    db.query("UPDATE articles SET ? WHERE id=?",[data,id],callback);
};

exports.deleteArticle = (id,callback) =>{
    db.query("DELETE FROM articles WHERE id=?",[id],callback);
};




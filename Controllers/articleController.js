// const model = require('../Models/articleModel');

// exports.getAll = (req,res) =>{
//     model.getAllArticles((err,results) =>{
//         res.json(results);
//     });
// };

// exports.getProducts = (req,res) =>{
//     model.getArticle(req.params.id,(err,results) =>{
//         if(results.length === 0)
//             return
//         res.status(404).json({message: "Article Introuvable"});
//         res.status(200).json(results[0]);
//     });
// };


// exports.update = (req,res) =>{
//     const id = req.params.id;

//     model.updateArticle(id,req.body,(err,results) =>{

//         if(err) return;
//         res.status(500).json(err);

//         if(result.affectedRows === 0)
//             return
        
//         res.status(404).json({message: "Article non trouve"});
//         res.status(400).json({message:"Requete Mal Formee"});
//         res.json({message:"Article Mise A Jour Avec Succes!"});
//     });
// };

// exports.delete = (req,res) =>{
//     const id = req.params.id;
//     model.deleteArticle(id,(err,result) =>{
//         if(err) return 
//         res.status(500).json(err);

//         if(result.affectedRows === 0)
//             return
//         res.status(404).json({message:"Article Non Trouve"});
//         res.json({message:"Article Supprime !"});

//     });
// };

// exports.search = (req, res) => {
//     const query = req.query.query;

//     if (!query) {
//         return res.status(400).json({ message: "Query manquante" });
//     }

//     model.searchArticles(query, (err, results) => {
//         if (err) return res.status(500).json(err);

//         res.json(results);
//     });
// };

// exports.filter = (req, res) => {
//     model.filterArticles(req.query, (err, results) => {
//         if (err) return res.status(500).json(err);
//         res.json(results);
//     });
// };

// exports.create = (req, res) => {
//     const { titre, auteur } = req.body;

//     if (!titre || !auteur) {
//         return res.status(400).json({
//             message: "Titre et auteur sont obligatoires"
//         });
//     }

//     model.createArticle(req.body, (err, result) => {
//         if (err) return res.status(500).json(err);

//         res.status(201).json({ id: result.insertId });
//     });
// };

const model = require('../Models/articleModel');

exports.getAll = (req, res) => {
    model.getAllArticles((err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.getProducts = (req, res) => {
    model.getArticle(req.params.id, (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0)
            return res.status(404).json({ message: "Article Introuvable" });
        res.status(200).json(results[0]);
    });
};

exports.update = (req, res) => {
    const id = req.params.id;
    model.updateArticle(id, req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Article non trouvé" });
        res.json({ message: "Article mis à jour avec succès !" });
    });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    model.deleteArticle(id, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.affectedRows === 0)
            return res.status(404).json({ message: "Article Non Trouvé" });
        res.json({ message: "Article Supprimé !" });
    });
};

exports.search = (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ message: "Query manquante" });
    }
    model.searchArticles(query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.filter = (req, res) => {
    model.filterArticles(req.query, (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
};

exports.create = (req, res) => {
    const { titre, auteur } = req.body;
    if (!titre || !auteur) {
        return res.status(400).json({
            message: "Titre et auteur sont obligatoires"
        });
    }
    model.createArticle(req.body, (err, result) => {
        if (err) return res.status(500).json(err);
        res.status(201).json({ id: result.insertId, message: "Article créé avec succès !" });
    });
};
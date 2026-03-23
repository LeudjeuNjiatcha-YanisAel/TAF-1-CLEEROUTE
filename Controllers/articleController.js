const model = require('../Models/articleModel');

// req = donnees client
// res = donnees serveur
exports.create = (req,res) =>{
    
    // Envoie des donnees au model
    model.createArticle(req.body,(err,result) =>{
        if(err) return
        // cas ou il y a l'erreur
        res.status(500).json(err);

        //cas ou il y'a succes
        res.status(201).json({message:"Article Cree",id:result.insertId});

    });
};

exports.getAll = (req,res) =>{
    model.getAllArticles((err,results) =>{
        res.json(results);
    });
};

exports.getProducts = (req,res) =>{
    model.getArticle(req.params.id,(err,results) =>{
        if(results.length === 0)
            return
        res.status(404).json({message: "Article Introuvable"});
        res.status(200).json(results[0]);
    });
};


exports.update = (req,res) =>{
    const id = req.params.id;

    model.updateArticle(id,req.body,(err,results) =>{

        if(err) return;
        res.status(500).json(err);

        if(result.affectedRows === 0)
            return
        
        res.status(404).json({message: "Article non trouve"});
        res.status(400).json({message:"Requete Mal Formee"});
        res.json({message:"Article Mise A Jour Avec Succes!"});
    });
};

exports.delete = (req,res) =>{
    const id = req.params.id;
    model.deleteArticle(id,(err,result) =>{
        if(err) return 
        res.status(500).json(err);

        if(result.affectedRows === 0)
            return
        res.status(404).json({message:"Article Non Trouve"});
        res.json({message:"Article Supprime !"});

    });
};
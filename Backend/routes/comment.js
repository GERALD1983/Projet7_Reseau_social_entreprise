const express = require("express");
const router = express.Router();

// creation des routes de commentaire des utilisateurs modif get et supprimer commentaire

const commentaires = require("../controllers/comment");

// Create a new Commentaire
router.post("/commentaire", commentaires.create);

// Retrieve all Commentaires
router.get("/commentaires", commentaires.findAll);

// Retrieve a single Commentaire with commentaireId
router.get("/commentaire/:commentaireId", commentaires.findOne);

// Update a Commentaire with commentaireId
router.put("/commentaire/:commentaireId", commentaires.update);

// Delete a Commentaire with commentaireId
router.delete("/commentaire/:commentaireId", commentaires.delete);

// Delete all Commentaires
router.delete("/commentaires", commentaires.deleteAll);

module.exports = router;

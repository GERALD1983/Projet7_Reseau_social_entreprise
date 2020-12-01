const express = require("express");
const router = express.Router();

// creation des routes de post des utilisateurs modif get et supprimer post

const postes = require("../controllers/post");

// Create a new Poste
router.post("/poste", postes.create);

// Retrieve all Postes
router.get("/postes", postes.findAll);

// Retrieve a single Poste with posteId
router.get("/poste/:posteId", postes.findOne);

// Update a Poste with posteId
router.put("/poste/:posteId", postes.update);

// Delete a Poste with posteId
router.delete("/poste/:posteId", postes.delete);

// Delete all Postes
router.delete("/postes", postes.deleteAll);

module.exports = router;

const express = require("express");
const router = express.Router();

// creation des routes de post des utilisateurs modif get et supprimer post

const postes = require("../controllers/post");

// Create a new User
router.post("/poste", postes.create);

// Retrieve all Users
router.get("/postes", postes.findAll);

// Retrieve a single User with userId
router.get("/postes/:posteId", postes.findOne);

// Update a User with userId
router.put("/postes/:posteId", postes.update);

// Delete a User with userId
router.delete("/postes/:posteId", postes.delete);

// Delete all Users
router.delete("/postes", postes.deleteAll);

module.exports = router;

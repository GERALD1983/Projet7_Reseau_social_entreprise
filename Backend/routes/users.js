const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

// Create a new User
router.post("/users", users.create);

// Retrieve all Users
router.get("/users", users.findAll);

// Retrieve a single User with userId
router.get("/users/:userId", users.findOne);

// Update a User with userId
router.put("/users/:userId", users.update);

// Delete a User with userId
router.delete("/users/:userId", users.delete);

// Delete all users
router.delete("/users", users.deleteAll);

module.exports = router;

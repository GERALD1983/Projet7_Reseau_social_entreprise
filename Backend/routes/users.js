const express = require("express");
const router = express.Router();

const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");

const users = require("../controllers/users");

// Create a new User
router.post("/signup", verifyPassword, verifyEmail, users.signup);

// Retrieve a single User with userId
router.get("/login/:userId", users.login);

// Retrieve all Users
router.get("/users", users.findAllUsers);

// Retrieve a single User with posteId
//router.get("/user/:userId", postes.findOne);

// Update a User with userId
router.put("/user/:userId", users.updateUser);

// Delete a User with userId
router.delete("/user/:userId", users.deleteUser);

// Delete all Users
router.delete("/users", users.deleteAllUsers);

module.exports = router;

const express = require("express");
const router = express.Router();

const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");

const auth = require("../middleware/auth");

const users = require("../controllers/users");
//inscription et log

// Create a new User
router.post("/signup", verifyPassword, verifyEmail, users.signup);
// Retrieve a single User with userId
router.post("/login", users.login);

//users

// Retrieve all Users
router.get("/users", auth, users.findAllUsers);

// Retrieve a single User with posteId
router.get("/user/:userId", auth, users.findUser);

// Update a User with userId
router.put("/user/:userId", auth, users.updateUser);

// Delete a User with userId
router.delete("/user/:userId", auth, users.deleteUser);

// Delete all Users
router.delete("/users", users.deleteAllUsers);

module.exports = router;

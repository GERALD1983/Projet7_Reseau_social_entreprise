const express = require("express");
const router = express.Router();

const users = require("../controllers/users");

// Create a new User
router.post("/signup", users.signup);

// Retrieve a single User with userId
router.get("/login/:userId", users.login);

module.exports = router;

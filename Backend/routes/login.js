const express = require("express");
const router = express.Router();

const verifyPassword = require("../middleware/pass");
const verifyEmail = require("../middleware/email");

const log = require("../controllers/login");
//inscription et log

// Create a new User
router.post("/signup", verifyPassword, verifyEmail, log.signup);
// Retrieve a single User with userId
router.post("/login", log.login);

module.exports = router;

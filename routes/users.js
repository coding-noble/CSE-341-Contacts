const express = require("express");
const path = require("path");
const router = express.Router();

// Importing the usersController which contains the logic for handling requests
const usersController = require(path.join("..", "controllers", "users.js"))

// Route to get all users
router.get("/", usersController.getAll);

// Route to get a single user by ID
router.get("/:id", usersController.getSingle);

// Export the router so it can be used elsewhere
module.exports = router

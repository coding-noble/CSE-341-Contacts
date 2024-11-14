const express = require("express");
const path = require("path");
const router = express.Router();

// Importing the usersController which contains the logic for handling requests
const usersController = require(path.join("..", "controllers", "users.js"))

// GET Route to get all users
router.get("/", usersController.getAll);

// GET Route to get a single user by ID
router.get("/:id", usersController.getSingle);

// POST Route to create a new user
router.post("/", usersController.createUser)

// PUT Route to update a user by ID
router.put("/:id", usersController.updateUser)

// DELETE Route to delete a user by ID
router.delete("/:id", usersController.updateUser)

// Export the router so it can be used elsewhere
module.exports = router

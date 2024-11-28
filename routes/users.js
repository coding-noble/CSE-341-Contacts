const express = require("express");
const router = express.Router();

// Importing the usersController directly
const usersController = require("../controllers/users");

// GET Route to get all users
router.get("/", usersController.getAll);

// GET Route to get a single user by ID
router.get("/:id", usersController.getSingle);

// POST Route to create a new user
router.post("/", usersController.createUser);

// PUT Route to update a user by ID
router.put("/:id", usersController.updateUser);

// DELETE Route to delete a user by ID
router.delete("/:id", usersController.deleteUser);

// Export the router so it can be used elsewhere
module.exports = router;

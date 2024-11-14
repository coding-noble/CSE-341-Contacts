// Import the Express module and path modules
const express = require("express");
const path = require("path");

// Create a new router object to handle HTTP requests
const router = express.Router();

// Define a route for swagger
router.use('/', require("./swagger"))

// Define a route for the root URL ("/" when there is nothing after the port number) that responds with a "Hello World!" message
router.get("/", (req, res) => {
    // Send a 200 OK response with the "Hello World!" message
    //#swagger.tags=['Hello World']
    res.status(200).send("Hello World!");
});

// Use path.join() to build the path to the 'users' module dynamically for the /users route 
router.use("/users", require(path.join(__dirname, "users.js")));

// Export the router so it can be used elsewhere
module.exports = router;
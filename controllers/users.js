// Import the necessary MongoDB functions
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// Async function to get all users from the "users" collection within the database
const getAll = async (req, res) => {
    // call the database query and return a promise
    mongodb.getDatabase().collection("users").find().toArray()
    .then((users) => {
        // In the response set the Content-Type header to "application/json"
        res.setHeader('Content-Type', "application/json");

        // send a 200 OK status
        res.status(200).json(users);
    })
    // if any problems arise catch the errors and log the message
    .catch((err) => {
        console.error(err);

        // Send an internal server error response
        res.status(500).json({ error: "Failed to fetch users" });
    });
}

const getSingle = async (req, res) => {
    // Extract the user ID from the URL parameters in the request and store it in userId
    const userId = new ObjectId(req.params.id)

    // call the database query and return a promise (difference is we pass in an _id in the .find())
    mongodb.getDatabase().collection("users").find({_id: userId}).toArray()
    .then((users) => {
        // In the response set the Content-Type header to "application/json"
        res.setHeader('Content-Type', "application/json");

        // send a 200 OK status
        res.status(200).json(users[0]);
    })
    // if any problems arise catch the errors and log the message
    .catch((err) => {
        console.error(err);

        // Send an internal server error response (same as getAll)
        res.status(500).json({ error: "Failed to fetch users" });
    });
}

// Export the functions so they can be used elsewhere
module.exports = {
    getAll,
    getSingle
}
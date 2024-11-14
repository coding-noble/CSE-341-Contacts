// import the path module
const path = require("path");

// Import the necessary MongoDB functions
const mongodb = require(path.join("..", "data", "database"));
const ObjectId = require("mongodb").ObjectId;

// Async function to get all users from the "users" collection within the database
const getAll = async (req, res) => {
    //#swagger.tag=["Users"]
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
    //#swagger.tag=["Users"]
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

const createUser = async (req, res) => {
    //#swagger.tag=["Users"]
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().collection("users").insertOne(user);
    if (response.acknowledged) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "Some error occurred while creating a new user");
    }
}

const updateUser = async (req, res) => {
    //#swagger.tag=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    const response = await mongodb.getDatabase().collection("users").replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "Some error occurred while updating the user");
    }
}

const deleteUser = async (req, res) => {
    //#swagger.tag=["Users"]
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().collection("users").deleteOne({ _id: userId });
    if (response.deleteCount > 0) {
        res.status(204).send();
    }
    else {
        res.status(500).json(response.error || "Some error occurred while deleting the user");
    }
}

// Export the functions so they can be used elsewhere
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}
// Directly import MongoDB functions and ObjectId
const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

// Async function to get all users from the "users" collection within the database
const getAll = async (req, res) => {
    //#swagger.tag=["Users"]
    try {
        const users = await mongodb.getDatabase().collection("users").find().toArray();
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

// Get a single user by ID
const getSingle = async (req, res) => {
    //#swagger.tag=["Users"]
    const userId = new ObjectId(req.params.id);

    try {
        const users = await mongodb.getDatabase().collection("users").find({ _id: userId }).toArray();
        res.setHeader('Content-Type', "application/json");
        res.status(200).json(users[0]);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to fetch user" });
    }
}

// Create a new user
const createUser = async (req, res) => {
    console.log('Received request to create user:', req.body);

    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    try {
        const response = await mongodb.getDatabase().collection("users").insertOne(user);
        console.log('MongoDB response:', response);

        if (response.acknowledged) {
            const newUser = { ...user, _id: response.insertedId };
            console.log('New user created:', newUser);
            return res.status(201).json(newUser);
        } else {
            console.error('Failed to create user:', response);
            return res.status(500).json({ error: "Failed to create user" });
        }
    } catch (err) {
        console.error('Error creating user:', err);
        return res.status(500).json({ error: err.message });
    }
};

// Update user by ID
const updateUser = async (req, res) => {
    //#swagger.tag=["Users"]
    const userId = new ObjectId(req.params.id);
    const user = {
        email: req.body.email,
        username: req.body.username,
        name: req.body.name,
        ipaddress: req.body.ipaddress
    };

    try {
        const response = await mongodb.getDatabase().collection("users").replaceOne({ _id: userId }, user);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || "Some error occurred while updating the user");
        }
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ error: "Failed to update user" });
    }
}

// Delete user by ID
const deleteUser = async (req, res) => {
    //#swagger.tag=["Users"]
    const userId = req.params.id;

    if (!ObjectId.isValid(userId)) {
        return res.status(400).json({ error: "Invalid user ID format" });
    }

    try {
        const user = await mongodb.getDatabase().collection("users").findOne({ _id: new ObjectId(userId) });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const result = await mongodb.getDatabase().collection("users").deleteOne({ _id: new ObjectId(userId) });
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "User not found or already deleted" });
        }

        res.status(204).send();
    } catch (err) {
        console.error("Error deleting user:", err);
        res.status(500).json({ error: "Failed to delete user" });
    }
};

// Export the functions so they can be used elsewhere
module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
}

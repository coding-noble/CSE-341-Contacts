// import the dotenv module and mongodb client
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');

// Load environment variables from .env file
dotenv.config();

// variable to hold our database
let database;

// Validate the required environment variables in MONGODB_URL
const validateEnvVars = () => {
    if (!process.env.MONGODB_URL) {
        throw new Error('MONGODB_URL environment variable is not defined.');
    }
};

// Initialize the MongoDB database connection
const initDb = async (database_name) => {
    validateEnvVars(); // make sure that the environment variables are set

    // If the database is already initialized, return the existing instance
    if (database) {
        console.log('Database is already initialized.');
        return database;
    }

    try {
        // Attempt to connect to the MongoDB servers
        const client = await MongoClient.connect(process.env.MONGODB_URL);

        // Store the database connection from the client then log and return the success
        database = client.db(database_name);
        console.log('Database initialized successfully!');
        return database;
    // catch any errors and throw the message
    } catch (err) {
        console.error('Database connection failed:', err);
        throw err;
    }
};

// Get the database instance (ensure the database is initialized)
const getDatabase = () => {
    if (!database) {
        // Throw an error if the database is not initialized when attempting to get it
        throw new Error('Database is not initialized. Call initDb() first.');
    }
    return database;
};

// Export the functions so they can be used elsewhere
module.exports = {
    initDb,
    getDatabase
};

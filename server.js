// Import necessary modules
const express = require("express");

// Create an Express app instance
const app = express();

// Create the port (default is 26000 if not provided in environment variables)
const port = process.env.PORT || 26000;

// Import your database module and routes
const mongodb = require("./data/database.js");
const routes = require("./routes");

// Middleware to parse JSON bodies (Express 4.16+ has express.json() built-in)
app.use(express.json());  // Replaces bodyParser.json()

// CORS middleware (should be before routes)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Use routes middleware for handling routes
app.use("/", routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server and initialize the database
const startServer = async () => {
  try {
    // Initialize the database connection
    await mongodb.initDb("Contacts-Project");
    
    // Start the server after establishing a database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error initializing database:', err);
    process.exit(1); // Exit the process if there are any errors
  }
}

// Run the startServer async function
startServer();

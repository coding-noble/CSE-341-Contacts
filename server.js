// import the Express path, and bodyParser modules
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

// Create an Express app instance
const app = express();

// Create the port default is 26000 if not provided in environment variables (env)
const port = process.env.PORT || 26000;

// Create universal paths
const mongodb = require(path.join(__dirname, "data", "database.js"));
const routes = require(path.join(__dirname, "routes"));

// Use body-parser middleware for getting the parts of the user in the request
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", '*');
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// Use routes middleware for handling routes
app.use("/", routes);

// Start the server and initialize the database (Contacts-Project data base for me)
const startServer = async () => {
  // Initialize the database connection
  await mongodb.initDb("Contacts-Project").then(() => {
    // start the server after establishing a database connection
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  // if the server fails to start or the database fails to initialize catch the errors
  }).catch((err) => {
    console.error('Error initializing database:', err);
    process.exit(1); // Exit the process if there are any errors
  });
}

// run the startServer async function
startServer();

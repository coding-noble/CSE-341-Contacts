const express = require("express");
const path = require("path");
const app = express();

// Load environment variables and setup the port
const port = process.env.PORT || 26000;

// Use express Router for modular route management
const routes = require(path.join(__dirname, "routes"));
app.use("/", routes);

// Start the server and handle errors
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
}).on('error', (err) => {
  console.error(`Error starting server: ${err.message}`);
});
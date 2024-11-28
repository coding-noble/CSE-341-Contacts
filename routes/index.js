const express = require("express");
const router = express.Router();

// Swagger route setup
router.use("/", require("./swagger"));

// Basic Hello World route
router.get("/", (req, res) => {
  //#swagger.tag=["Hello World"]
  res.status(200).send("Hello World!");
});

// Route setup for users
router.use("/users", require("./users"));
//#swagger.tag=["Users"]

module.exports = router;

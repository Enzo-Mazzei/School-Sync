require("dotenv").config();

// Frameworks
const express = require("express");
const app = express();
const hbs = require("hbs");

// Config
require("./config")(app);
require("./config/index.js")(app); // Add this line to set up session middleware
require("./db");

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));

// Errors Handling
require("./error-handling")(app);

module.exports = app;

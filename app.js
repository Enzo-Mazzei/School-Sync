require("dotenv").config();

// Frameworks
const express = require("express");
const app = express();
const hbs = require("hbs");

// Config
require("./config")(app);
require("./db");

// Routes
app.use("/", require("./routes/index.routes"));

// Errors Handling
require("./error-handling")(app);

module.exports = app;

require("dotenv").config();

// Frameworks
const express = require("express");
const app = express();
const hbs = require("hbs");

// Config
require("./config")(app);
require("./db");

// HBS config
const hbsConfig = require("./config/hbs.config");
hbsConfig.registerPartial();
hbsConfig.registerHelper();

//Middlewares
const isLoggedIn = require("./middleware/isLoggedIn");
const updateSession = require("./middleware/updateSession");

// Local variable
app.use("/", updateSession);

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));

app.use("/dashboard", isLoggedIn);
app.use("/dashboard", require("./routes/dashboard/dashboard.routes"));
app.use("/dashboard", require("./routes/dashboard/profiles.routes"));
app.use("/dashboard", require("./routes/dashboard/grades.routes"));
app.use("/dashboard", require("./routes/dashboard/tests.routes"));
app.use("/dashboard", require("./routes/dashboard/courses.routes"));
app.use("/dashboard", require("./routes/dashboard/classes.routes"));
app.use("/dashboard", require("./routes/dashboard/admin.routes"));
// Errors Handling
require("./error-handling")(app);

module.exports = app;

require("dotenv").config();

// Frameworks
const express = require("express");
const app = express();
const hbs = require("hbs");

// Config
require("./config")(app);
require("./db");

// HBS config
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("dateFormatter", function (dateRaw) {
  const dateNow = new Date();
  const diffInMilliseconds = dateNow - dateRaw;
  const diffInSeconds = diffInMilliseconds / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 60;

  if (diffInDays > 1) {
    return Math.floor(diffInDays) + "d ago";
  } else if (diffInHours > 1) {
    return Math.floor(diffInHours) + "h ago";
  } else if (diffInMinutes > 1) {
    return Math.floor(diffInMinutes) + "m ago";
  } else {
    return Math.floor(diffInSeconds) + "s ago";
  }
});

hbs.registerHelper("toLocaleTime", function (dateRaw) {
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  return dateRaw.toLocaleTimeString("en-US", options);
});

//Middlewares
const isLoggedIn = require("./middleware/isLoggedIn");

// Local variable
app.use("/", (req, res, next) => {
  app.locals.currentUser = req.session.currentUser;
  next();
});

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));
// app.use("/dashboard", isLoggedIn)
app.use("/dashboard", require("./routes/dashboard/profiles.routes"));
app.use("/dashboard", require("./routes/dashboard/grades.routes"));
app.use("/dashboard", require("./routes/dashboard/tests.routes"));

// Errors Handling
require("./error-handling")(app);

module.exports = app;

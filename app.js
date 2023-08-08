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
  const diffInDays = diffInHours / 24;

  if (diffInDays > 1) {
    return Math.round(diffInDays) + "d ago";
  } else if (diffInHours > 1) {
    return Math.round(diffInHours) + "h ago";
  } else if (diffInMinutes > 1) {
    return Math.round(diffInMinutes) + "m ago";
  } else {
    return Math.round(diffInSeconds) + "s ago";
  }
});

hbs.registerHelper("toLocaleDate", function (dateRaw) {
  return dateRaw.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
});

hbs.registerHelper("toValueDate", function (date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return year + "-" + month + "-" + day;
});

//Middlewares
const isLoggedIn = require("./middleware/isLoggedIn");
const isTeacher = require("./middleware/isTeacher");
const updateSession = require("./middleware/updateSession");

// Local variable
app.use("/", updateSession);

// Routes
app.use("/", require("./routes/index.routes"));
app.use("/", require("./routes/auth.routes"));

app.use("/dashboard", isLoggedIn);

app.use("/dashboard", require("./routes/dashboard/profiles.routes"));
app.use("/dashboard", require("./routes/dashboard/grades.routes"));
app.use("/dashboard", isTeacher, require("./routes/dashboard/tests.routes"));

// Errors Handling
require("./error-handling")(app);

module.exports = app;

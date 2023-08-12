const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.render("pages/index", { navbar: true });
});

module.exports = router;

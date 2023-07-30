const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  const { currentUser } = req.session;
  res.render("index", { currentUser });
});

module.exports = router;

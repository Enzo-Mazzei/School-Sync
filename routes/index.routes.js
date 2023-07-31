const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

router.get("/", (req, res, next) => {
  res.render("index");
});

const isLoggedIn = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.redirect("/login");
  }
  next();
};

router.get("/user/profile", isLoggedIn, (req, res) => {
  const userId = req.session.currentUser;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});
router.get("/user/profile/edit", isLoggedIn, (req, res) => {
  const userId = req.user.userId;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.status(200).json(user);
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});
router.post("/user/profile/edit", isLoggedIn, (req, res) => {
  const userId = req.user.userId;
  const { firstName, lastName, email, password } = req.body;

  User.findByIdAndUpdate(
    userId,
    { firstName, lastName, email, password },
    { new: true }
  )
    .then((updatedUser) => {
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found." });
      }

      res
        .status(200)
        .json({ message: "Profile updated successfully.", user: updatedUser });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});

module.exports = router;

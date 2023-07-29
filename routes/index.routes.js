const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/profile", (req, res) => {
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
router.get("/profile/edit", (req, res) => {
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
router.post("/profile/edit", (req, res) => {
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

const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

router.get("/profile", (req, res) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.render("pages/dashboard/profile", {
          errorMessage: "User not found",
        });
      }
      res.render("pages/dashboard/profile", { user });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});
router.get("/profile/edit/email", (req, res) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.render("pages/dashboard/email-edit", {
          errorMessage: "User not found",
        });
      }
      res.render("pages/dashboard/email-edit", { user });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        errorMessage: "An error occurred while processing your request.",
      });
    });
});

router.get("/profile/edit/password", (req, res) => {
  const userId = req.session.currentUser._id;
  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.render("pages/dashboard/email-edit", {
          errorMessage: "User not found",
        });
      }
      res.render("pages/dashboard/password-edit", { user });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});
router.post("/profile/edit/email", (req, res) => {
  const userId = req.session.currentUser._id;
  const { email } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return res.render("pages/dashboard/email-edit", {
      errorMessage: "Invalid email format. Please provide a valid email.",
    });
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser && existingUser._id.toString() !== userId) {
        return res.render("pages/dashboard/email-edit", {
          errorMessage: "Email is already in use. Please use a different one.",
        });
      }
      return User.findByIdAndUpdate(userId, { email });
    })
    .then((updatedUser) => {
      req.session.currentUser = updatedUser;
      res.redirect("/dashboard/profile");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "An error occurred while processing your request.",
      });
    });
});

router.post("/profile/edit/password", async (req, res) => {
  const userId = req.session.currentUser._id;
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(userId);

  const isPasswordMatch = await bcrypt.compare(oldPassword, user.passwordHash);

  if (!isPasswordMatch) {
    return res.render("pages/dashboard/password-edit", {
      errorMessage: "Invalid old password. Please try again.",
    });
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,30}$/;

  if (!passwordRegex.test(newPassword)) {
    return res.render("pages/dashboard/password-edit", {
      errorMessage:
        "New password must be 6 to 30 characters long and contain at least one uppercase letter and one number.",
    });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { passwordHash: hashedPassword },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    req.session.currentUser = updatedUser;

    res.redirect("/dashboard/profile");
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while processing your request.",
    });
  }
});
module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

/* GET signup */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup-1");
});

/* GET login */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

/* POST signup */
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/;

  if (!passwordRegex.test(password)) {
    res.render("auth/signup-2", {
      errorMessage:
        "Password must be 6 to 30 characters long and contain at least one uppercase letter and one number.",
      errorPassword: true,
    });
    return;
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.render("auth/signup-2", {
          errorMessage: "Email is already in use. Please use a different one.",
          errorEmail: true,
        });
        return;
      }
      return bcrypt.hash(password, 10);
    })
    .then((hashedPassword) => {
      return User.create({
        firstName,
        lastName,
        email,
        passwordHash: hashedPassword,
      });
    })
    .then(() => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.error(error);
    });
});

/* POST login */
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "User not found. Please sign up.",
          errorEmail: true,
        });
        return;
      }

      return bcrypt.compare(password, user.passwordHash);
    })
    .then((isPasswordMatch) => {
      if (!isPasswordMatch) {
        res.render("auth/login", {
          errorMessage: "Invalid credentials. Please try again.",
          errorPassword: true,
        });
        return;
      }
      res.redirect("/user/profile");
    })
    .catch((error) => {
      console.error(error);
    });
});

module.exports = router;

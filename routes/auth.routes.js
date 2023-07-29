const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("./models/user");

router.get("/signup", (req, res, next) => {
  res.render("signup");
});
router.get("/login", (req, res, next) => {
  res.render("login");
});
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,30}$/;

  if (!passwordRegex.test(password)) {
    return res.status(500).json({
      message:
        "Password must be 6 to 30 characters long and contain at least one uppercase letter and one number.",
    });
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(500).json({
          message: "Email is already in use. Please use a different one.",
        });
      }

      bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            firstName,
            lastName,
            email,
            passwordHash: hashedPassword,
          });

          newUser
            .save()
            .then(() => {
              res.status(201).json({ message: "User created successfully." });
            })
            .catch((error) => {
              console.error(error);
              res.status(500).json({
                message: "An error occurred while processing your request.",
              });
            });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            message: "An error occurred while processing your request.",
          });
        });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ message: "User not found. Please sign up." });
      }

      bcrypt
        .compare(password, user.passwordHash)
        .then((isPasswordMatch) => {
          if (!isPasswordMatch) {
            return res
              .status(500)
              .json({ message: "Invalid credentials. Please try again." });
          }

          res
            .status(200)
            .json({ message: "Login successful.", loggedIn: true });
        })
        .catch((error) => {
          console.error(error);
          res.status(500).json({
            message: "An error occurred while processing your request.",
          });
        });
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({ message: "An error occurred while processing your request." });
    });
});

module.exports = router;

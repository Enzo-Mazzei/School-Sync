const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User.model");

/* GET signup */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

/* GET login */
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

/* POST signup */
router.post("/signup", (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,30}$/;

  if (!passwordRegex.test(password)) {
    res.render("auth/signup", {
      errorMessage:
        "Password must be 6 to 30 characters long and contain at least one uppercase letter and one number.",
    });
    return;
  }

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        res.render("auth/signup", {
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
    .then((user) => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.error(error);
    });
});

/* POST login */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  let requiredOptions = {
    errorMessage: "This field is required.",
    email,
    password,
  };

  if (!email && password) {
    requiredOptions.errorEmail = true;
    res.render("auth/login", requiredOptions);
  } else if (email && !password) {
    requiredOptions.errorPassword = true;
    res.render("auth/login", requiredOptions);
  } else if (!email && !password) {
    requiredOptions.errorEmail = true;
    requiredOptions.errorPassword = true;
    res.render("auth/login", requiredOptions);
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.render("auth/login", {
        errorMessage: "User not found. Please sign up.",
        errorEmail: true,
        email,
        password,
      });
      return;
    }

    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      res.render("auth/login", {
        errorMessage: "Invalid password. Please try again.",
        errorPassword: true,
        email,
        password,
      });
      return;
    }

    req.session.currentUser = user;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

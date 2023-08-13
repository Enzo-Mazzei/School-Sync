const express = require("express");
const router = express.Router();

// Middleware
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");

// Controllers
const postSignup = require("../controllers/auth/postSignup");
const postLogin = require("../controllers/auth/postLogin");
const getSignup = require("../controllers/auth/getSignup");
const getLogin = require("../controllers/auth/getLogin");
const postLogout = require("../controllers/auth/postLogout");

/* GET signup */
router.get("/signup", isLoggedOut, getSignup);

/* GET login */
router.get("/login", isLoggedOut, getLogin);

/* POST signup */
router.post("/signup", isLoggedOut, postSignup);

/* POST login */
router.post("/login", isLoggedOut, postLogin);

/* POST logout */
router.post("/logout", isLoggedIn, postLogout);

module.exports = router;

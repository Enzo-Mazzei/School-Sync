const express = require("express");
const router = express.Router();

// Controllers
const getProfile = require("../../controllers/profile/getProfile");
const getEditEmail = require("../../controllers/profile/getEditEmail");
const getEditPassword = require("../../controllers/profile/getEditPassword");
const postEditEmail = require("../../controllers/profile/postEditEmail");
const postEditPassword = require("../../controllers/profile/postEditPassword");

/* POST profile */
router.get("/profile", getProfile);

/* GET edit/email */
router.get("/profile/edit/email", getEditEmail);

/* GET edit/password */
router.get("/profile/edit/password", getEditPassword);

/* POST edit/email */
router.post("/profile/edit/email", postEditEmail);

/* POST edit/password */
router.post("/profile/edit/password", postEditPassword);

module.exports = router;

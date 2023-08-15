const express = require("express");
const router = express.Router();

// Controllers
const getAdmin = require("../../controllers/admin/getAdmin");

// Middlewares
const isAdmin = require("../../middleware/isAdmin");

/* GET ADMIN */
router.get("/admin", isAdmin, getAdmin);

module.exports = router;

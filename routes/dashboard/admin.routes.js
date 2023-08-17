const express = require("express");
const router = express.Router();

// Controllers
const getAdmin = require("../../controllers/admin/getAdmin");

// Middlewares
const isAdmin = require("../../middleware/isAdmin");
const updateRole = require("../../controllers/admin/updateRole");

/* GET ADMIN */
router.get("/admin", isAdmin, getAdmin);

/* UPDATE ROLE */
router.post("/update-role", updateRole);

module.exports = router;

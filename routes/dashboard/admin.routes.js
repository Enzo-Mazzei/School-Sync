const express = require("express")
const router = express.Router()

// Controllers
const getAdmin = require("../../controllers/admin/getAdmin")

/* GET ADMIN */
router.get("/admin", getAdmin)

module.exports = router
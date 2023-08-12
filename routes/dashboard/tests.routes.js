const express = require("express");
const router = express.Router();

// Middlewares
const isTeacher = require("../../middleware/isTeacher");

// Controllers
const getTests = require("../../controllers/tests/getTests");
const getTest = require("../../controllers/tests/getTest");
const createTest = require("../../controllers/tests/createTest");
const deleteTest = require("../../controllers/tests/deleteTest");
const editTest = require("../../controllers/tests/editTest");

/* GET ALL */
router.get("/tests", isTeacher, getTests);

/* POST CREATE */
router.post("/tests/create", isTeacher, createTest);

/* GET BY ID */
router.get("/tests/:testID", isTeacher, getTest);

/* POST DELETE */
router.post("/tests/:testID/delete", isTeacher, deleteTest);

/* POST EDIT */
router.post("/tests/:testID/edit", isTeacher, editTest);

module.exports = router;

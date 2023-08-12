const express = require("express");
const router = express.Router();

const getTests = require("../../controllers/tests/getTests");
const getTest = require("../../controllers/tests/getTest");
const createTest = require("../../controllers/tests/createTest");
const deleteTest = require("../../controllers/tests/deleteTest");
const editTest = require("../../controllers/tests/editTest");

/* GET ALL */
router.get("/tests", getTests);

/* POST CREATE */
router.post("/tests/create", createTest);

/* GET BY ID */
router.get("/tests/:testID", getTest);

/* POST DELETE */
router.post("/tests/:testID/delete", deleteTest);

/* POST EDIT */
router.post("/tests/:testID/edit", editTest);

module.exports = router;

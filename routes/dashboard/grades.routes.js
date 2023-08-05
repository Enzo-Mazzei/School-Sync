const express = require("express");
const router = express.Router();

const createGrade = require("../../controllers/grades/createGrade");
const deleteGrade = require("../../controllers/grades/deleteGrade");
const getGrades = require("../../controllers/grades/getGrades");
const getGrade = require("../../controllers/grades/getGrade");

/* GET ALL */
router.get("/grades", getGrades);

/* POST CREATE */
router.post("/grades/create/:testID", createGrade);

/* GET ONE */
router.get("/grades/:id", getGrade);

/* POST DELETE */
router.post("/grades/:gradeID/delete/:testID", deleteGrade);

module.exports = router;

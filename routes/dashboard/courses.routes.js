const express = require("express");
const router = express.Router();

const createCourse = require("../../controllers/courses/createCourse");

// CREATE COURSES
router.post("/courses/create", createCourse);

module.exports = router;

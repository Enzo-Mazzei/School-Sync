const express = require("express");
const router = express.Router();

// Controllers
const getClasses = require("../../controllers/classes/getClasses");
const createClass = require("../../controllers/classes/createClass");
const deleteClass = require("../../controllers/classes/deleteClass");
const getClass = require("../../controllers/classes/getClass");
const searchStudent = require("../../controllers/classes/searchStudent");
const addStudentToClass = require("../../controllers/classes/addStudentToClass");
const removeStudentFromClass = require("../../controllers/classes/removeStudentFromClass");

// Middlewares
const isTeacher = require("../../middleware/isTeacher");

/* GET CLASSES */
router.get("/classes", isTeacher, getClasses);

/* CREATE CLASS */
router.post("/classes", isTeacher, createClass);

/* DELETE CLASS */
router.post("/classes/:id/delete", isTeacher, deleteClass);

/* GET CLASS */
router.get("/classes/:id", isTeacher, getClass);

/* GET CLASS SEARCH */
router.get("/classes/:id/search", isTeacher, searchStudent);

/* GET CLASSES ADD STUDENT */
router.post("/classes/:id/add", isTeacher, addStudentToClass);

/* REMOVE CLASSES STUDENT */
router.post("/classes/:id/remove", isTeacher, removeStudentFromClass);

module.exports = router;

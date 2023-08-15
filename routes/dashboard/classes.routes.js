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

/* GET CLASSES */
router.get("/classes", getClasses);

/* CREATE CLASS */
router.post("/classes", createClass);

/* DELETE CLASS */
router.post("/classes/:id/delete", deleteClass);

/* GET CLASS */
router.get("/classes/:id", getClass);

/* GET CLASS SEARCH */
router.get("/classes/:id/search", searchStudent);

/* GET CLASSES ADD STUDENT */
router.post("/classes/:id/add", addStudentToClass);

/* REMOVE CLASSES STUDENT */
router.post("/classes/:id/remove", removeStudentFromClass);

module.exports = router;

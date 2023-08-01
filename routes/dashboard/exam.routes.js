const express = require("express");
const Exam = require("../../models/Exam.model");
const router = express.Router();

/* POST exam/create */
router.post("/exam/create", (req, res) => {
  const { title, comment, maxGrade, course, teacher, date } = req.body;
  Exam.create({ title, comment, maxGrade, course, teacher, date })
    .then((exam) => {
      //   res.redirect("/exam/:id");
      res.json(exam);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

module.exports = router;

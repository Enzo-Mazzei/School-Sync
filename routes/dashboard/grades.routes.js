const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Grades = require("../../models/Grades.model");
const Exam = require("../../models/Exam.model");

/* GET grades */
router.get("/grades", (req, res) => {
  const { currentUser } = req.session;
  Grades.find({ student: currentUser._id })
    .select("-student")
    .populate({
      path: "exam",
      select: "-_id title maxGrade course teacher",
      populate: {
        path: "teacher",
        select: "-_id firstName lastName",
      },
    })
    .then((grades) => {
      res.json({ grades });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

/* GET grades/create */
router.get("/grades/create", async (req, res) => {
  const { currentUser } = req.session;

  try {
    const exams = await Exam.find({ teacher: currentUser._id });
    const users = await User.find({ class: currentUser.class });
    res.json({ exams, users });
  } catch (error) {
    res.json(error);
  }
});

/* POST grades/create */
router.post("/grades/create", async (req, res) => {
  const { grade, student, exam } = req.body;

  try {
    const gradeCreate = await Grades.create({ grade, student, exam });
    const examUpdate = await Exam.updateOne(
      { _id: gradeCreate.exam },
      { $push: { grades: gradeCreate._id } }
    );
    res.sendStatus(200);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;

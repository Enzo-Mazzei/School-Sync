const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Grades = require("../../models/Grades.model");
const Exam = require("../../models/Exam.model");
const updateAvgGrade = require("../../controllers/updateAvgGrade");

/* GET grades */
router.get("/grades", (req, res) => {
  const { currentUser } = req.session;
  User.findOne({ _id: currentUser._id })
    .populate({
      path: "grades",
      populate: {
        path: "exam",
        populate: {
          path: "teacher grades",
          select: "firstName lastName grade",
        },
      },
    })
    .then((user) => {
      res.json({ grades: user.grades });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

/* GET grades/create */
router.get("/grades/create", async (req, res) => {});

/* POST grades/create */
router.post("/grades/create", async (req, res) => {
  const { grade, student, exam } = req.body;

  try {
    // Create new grade
    const gradeCreate = await Grades.create({ grade, student, exam });

    // Push new grade to [grades] inside the User document
    const userUpdate = await User.findOneAndUpdate(
      { _id: gradeCreate.student._id },
      { $push: { grades: gradeCreate._id } },
      { new: true }
    );

    // Push new grade to [grades] inside the Exam document
    const examUpdate = await Exam.findOneAndUpdate(
      { _id: gradeCreate.exam._id },
      { $push: { grades: gradeCreate._id } },
      { new: true }
    ).populate("grades");

    const examUpdateAverage = await updateAvgGrade(
      examUpdate.grades,
      gradeCreate.exam._id
    );

    res.json(examUpdateAverage);
  } catch (error) {
    res.json({ error: error.message });
  }
});

module.exports = router;

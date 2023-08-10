const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Grades = require("../../models/Grades.model");
const updateAvgGrade = require("../../controllers/updateAvgGrade");
const Test = require("../../models/Tests.model");

/* GET grades */
router.get("/grades", async (req, res) => {
  const { currentUser } = req.session;

  User.findOne({ _id: currentUser._id })
    .populate({
      path: "grades",
      populate: {
        path: "test",
        populate: {
          path: "teacher grades",
          select: "firstName lastName grade",
        },
      },
    })
    .then((user) => {
      res.render("pages/dashboard/grades", {
        grades: user.grades,
      });
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

/* GET grade/:id */
router.get("/grade/:id", (req, res) => {
  const { id } = req.params;
  const { currentUser } = req.session;

  //Fecth grade with id
  Grades.findOne({ _id: id })
    .populate({
      path: "test",
      populate: {
        path: "teacher grades",
        select: "firstName lastName grade",
      },
    })
    .then((grade) => {
      //Check if user is student on the grade
      if (currentUser._id == grade.student) {
        res.json(grade);
      } else {
        res.json({ error: 401 });
      }
    })
    .catch((err) => {
      res.json(err);
    });
});

/* POST grades/create */
router.post("/grade/create/:testID", async (req, res) => {
  const { grade, student } = req.body;
  const { testID } = req.params;

  try {
    // Create new grade
    const gradeCreate = await Grades.create({ grade, student, test: testID });
    // Push new grade to [grades] inside the User document
    const userUpdate = await User.findOneAndUpdate(
      { _id: gradeCreate.student._id },
      { $push: { grades: gradeCreate._id } },
      { new: true }
    );
    // Push new grade to [grades] inside the Test document
    const testUpdate = await Test.findOneAndUpdate(
      { _id: gradeCreate.test._id },
      { $push: { grades: gradeCreate._id } },
      { new: true }
    ).populate("grades");
    const testUpdateAverage = await updateAvgGrade(
      testUpdate.grades,
      gradeCreate.test._id
    );
    res.redirect("/dashboard/tests/" + testID);
  } catch (error) {
    res.json({ error: error.message });
  }
});

/* DELETE grade */
router.post("/grade/:gradeID/delete/:testID", (req, res) => {
  const { gradeID, testID } = req.params;
  console.log(gradeID, testID);
  Grades.findOneAndDelete({ _id: gradeID })
    .then((result) => {
      res.redirect("/dashboard/test/" + testID);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

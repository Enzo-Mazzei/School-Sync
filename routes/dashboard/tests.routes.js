const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Test = require("../../models/Tests.model");
const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");
const Grades = require("../../models/Grades.model");

/* POST test/create */
router.post("/tests/create", async (req, res) => {
  const { title, comment, maxGrade, date } = req.body;
  const { currentUser } = req.session;

  try {
    const user = await User.findOne({ _id: currentUser._id }).populate("tests");

    const optionsError = {
      title,
      comment,
      maxGrade,
      date,
      tests: user.tests,
      result: user.tests.length,
    };

    // Handleling Error: field is empty
    if (!title || !maxGrade || !date) {
      optionsError.errorMessage =
        "Missing field(s): Test name, maximum grade and date are require!";
      res.render("pages/dashboard/tests", optionsError);
      return;
    }
    // Create new test
    const testCreate = await Test.create({
      title,
      comment,
      maxGrade,
      teacher: currentUser._id,
      date,
    });

    // Push new test to User document
    const updateUser = await User.findOneAndUpdate(
      { _id: testCreate.teacher },
      { $push: { tests: testCreate._id } },
      { new: true }
    );

    res.redirect("/dashboard/tests/" + testCreate._id);
  } catch (error) {
    //Mongoose validationError
    if (error instanceof mongoose.Error.ValidationError) {
      optionsError.errorMessage = error.message;
      res.render("pages/dashboard/test", optionsError);
    } else {
      console.log(error);
    }
  }
});

/* GET tests */
router.get("/tests", async (req, res) => {
  const { currentUser } = req.session;
  try {
    const user = await User.findOne({ _id: currentUser._id }).populate({
      path: "tests",
      options: { sort: { createdAt: -1 } },
    });
    res.render("pages/dashboard/tests", {
      tests: user.tests,
      result: user.tests.length,
    });
  } catch (error) {
    console.log(error);
  }
});

/* GET tests/:id */
router.get("/tests/:testID", async (req, res) => {
  const { testID } = req.params;
  try {
    const [test, students] = await Promise.all([
      Tests.findOne({ _id: testID }).populate({
        path: "grades",
        populate: {
          path: "student",
        },
      }),
      User.find(),
    ]);

    const result = test.grades.length;

    res.render("pages/dashboard/test", { test, students, result });
  } catch (error) {
    console.log(error);
  }
});

/* DELETE tests/:id */
router.post("/tests/:testID/delete", async (req, res) => {
  const { testID } = req.params;
  const { currentUser } = req.session;

  try {
    //Delete test
    const deletedTest = await Test.findOneAndDelete({ _id: testID }).populate(
      "grades"
    );

    const grades = deletedTest.grades;
    const studentIDs = grades.map((grade) => grade.student);
    const gradeIDs = grades.map((grade) => grade._id);

    await Promise.all([
      User.findOneAndUpdate(
        { _id: currentUser._id },
        { $pull: { tests: deletedTest._id } }
      ),
      User.updateMany(
        { _id: { $in: studentIDs } },
        {
          $pull: {
            grades: { $in: gradeIDs },
          },
        }
      ),
      Grades.deleteMany({ _id: { $in: gradeIDs } }),
    ]);

    res.redirect("/dashboard/tests");
  } catch (error) {
    console.log(error);
  }
});

/* EDIT /tests/:id/edit */
router.post("/tests/:testID/edit", (req, res) => {
  const { testID } = req.params;
  const { title, comment, date, maxGrade } = req.body;

  Test.findOneAndUpdate(
    { _id: testID },
    { title, comment, date, maxGrade },
    { new: true }
  )
    .then((result) => {
      res.redirect("/dashboard/tests/" + testID);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

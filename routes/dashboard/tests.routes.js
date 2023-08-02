const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Test = require("../../models/Tests.model");
const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");

/* POST test/create */
router.post("/tests/create", async (req, res) => {
  const { title, comment, maxGrade, date } = req.body;
  const { currentUser } = req.session;
  const optionsError = { title, comment, maxGrade, date };

  // Handleling Error: field is empty
  if (!title || !maxGrade || !date) {
    optionsError.errorMessage =
      "Missing field(s): Test name, maximum grade and date are require!";
    res.render("dashboard/tests", optionsError);
    return;
  }

  try {
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

    res.redirect("/dashboard/tests");
  } catch (error) {
    //Mongoose validationError
    if (error instanceof mongoose.Error.ValidationError) {
      optionsError.errorMessage = error.message;
      res.render("dashboard/tests", optionsError);
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
    res.render("dashboard/tests", { tests: user.tests });
  } catch (error) {
    console.log(error);
  }
});

/* GET test/:id */
router.get("/test/:testID", (req, res) => {
  const { testID } = req.params;
  Tests.findOne({ _id: testID })
    .then((test) => {
      res.json(test);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;

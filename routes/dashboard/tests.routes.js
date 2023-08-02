const express = require("express");
const router = express.Router();
const Test = require("../../models/Tests.model");
const User = require("../../models/User.model");

/* POST test/create */
router.post("/tests/create", async (req, res) => {
  const { title, comment, maxGrade, date } = req.body;

  const teacher = req.session.currentUser._id;

  // Create new test
  const testCreate = await Test.create({
    title,
    comment,
    maxGrade,
    teacher,
    date,
  });

  // Push new test to User document
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: testCreate.teacher },
      { $push: { tests: testCreate._id } },
      { new: true }
    );

    res.redirect("/dashboard/grades");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

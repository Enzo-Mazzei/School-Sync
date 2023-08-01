const express = require("express");
const router = express.Router();
const Test = require("../../models/Tests.model");
const User = require("../../models/User.model");

/* POST test/create */
router.post("/tests/create", async (req, res) => {
  const { title, comment, maxGrade, course, teacher, date } = req.body;
  const testCreate = await Test.create({
    title,
    comment,
    maxGrade,
    course,
    teacher,
    date,
  });

  // Push new test to User
  try {
    const updateUser = await User.findOneAndUpdate(
      { _id: testCreate.teacher },
      { $push: { tests: testCreate._id } },
      { new: true }
    );

    res.json({ updateUser });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

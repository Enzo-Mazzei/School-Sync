const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");

module.exports = async (req, res, next) => {
  try {
    const { title, comment, maxGrade, date, classID } = req.body;
    const { currentUser } = req.session;

    const user = await User.findOne({ _id: currentUser._id }).populate("tests");

    // Handleling Error: field is empty
    if (!title || !maxGrade || !date || !classID) {
      return res.render("pages/dashboard/tests", {
        tests: user.tests,
        errorMessage:
          "Missing field(s): Test name, maximum score and date are require!",
      });
    }

    // Handling invalid maxGrade format
    const maxGradePattern = /^[0-9]+$/;
    const maxGradeTest = maxGradePattern.test(maxGrade);
    if (!maxGradeTest) {
      return res.render("pages/dashboard/tests", {
        tests: user.tests,
        errorMessage: "Maximum score type is invalid: need to be a number.",
      });
    }

    // Create new test
    const testCreate = await Tests.create({
      title,
      comment,
      maxGrade,
      teacher: currentUser._id,
      date,
      class: classID,
    });

    await User.findOneAndUpdate(
      { _id: currentUser._id },
      { $push: { tests: testCreate._id } },
      { new: true }
    );

    res.redirect("/dashboard/tests/" + testCreate._id);
  } catch (error) {
    console.log(error);
  }
};

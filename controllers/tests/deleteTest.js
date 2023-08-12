const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");
const Grades = require("../../models/Grades.model");

module.exports = async (req, res, next) => {
  const { testID } = req.params;
  const { currentUser } = req.session;

  try {
    //Delete test
    const deletedTest = await Tests.findOneAndDelete({ _id: testID }).populate(
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
};

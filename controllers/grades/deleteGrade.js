const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");
const Grades = require("../../models/Grades.model");

const updateAvgGrade = require("../utils/updateAvgGrade");

module.exports = async (req, res, next) => {
  const { gradeID, testID } = req.params;

  try {
    const gradeDelete = await Grades.findOneAndDelete({
      _id: gradeID,
    }).populate("student");

    const [testUpdate, userUpdate] = await Promise.all([
      Tests.findOneAndUpdate(
        { _id: testID },
        {
          $pull: {
            grades: gradeDelete._id,
          },
        },
        { new: true }
      ).populate("grades"),
      User.findOneAndUpdate(
        { _id: gradeDelete.student._id },
        {
          $pull: {
            grades: gradeDelete._id,
          },
        }
      ),
    ]);

    const testUpdateAverage = await updateAvgGrade(
      testUpdate.grades,
      gradeDelete.test
    );

    res.redirect(`/dashboard/tests/${testID}`);
  } catch (error) {
    console.log(error);
  }
};

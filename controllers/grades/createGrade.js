const ClassModel = require("../../models/Class.model");
const Grades = require("../../models/Grades.model");
const Tests = require("../../models/Tests.model");
const User = require("../../models/User.model");

const updateAvgGrade = require("../utils/updateAvgGrade");

module.exports = async (req, res, netx) => {
  const { grade, student } = req.body;
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

    const studentIDs = test.grades.map((grade) => grade.student._id.toString());

    const currentClassId = test.class;
    const currentClass = await ClassModel.findOne({
      _id: currentClassId,
    }).populate("students");

    if (studentIDs.includes(student)) {
      res.render("pages/dashboard/test", {
        test,
        students: currentClass.students,
        errorMessage: "Student already have a grade!",
      });
      return;
    }

    if (!grade || !student) {
      res.render("pages/dashboard/test", {
        test,
        students: currentClass.students,
        errorMessage: "Missing field(s): student, grade are requiere!",
      });
      return;
    }

    // Create new grade
    const gradeCreate = await Grades.create({ grade, student, test: testID });

    const [userUpdate, testUpdate] = await Promise.all([
      User.findOneAndUpdate(
        { _id: gradeCreate.student._id },
        { $push: { grades: gradeCreate._id } },
        { new: true }
      ),
      Tests.findOneAndUpdate(
        { _id: gradeCreate.test._id },
        { $push: { grades: gradeCreate._id } },
        { new: true }
      ).populate("grades"),
    ]);

    const testUpdateAverage = await updateAvgGrade(
      testUpdate.grades,
      gradeCreate.test._id
    );

    res.redirect("/dashboard/tests/" + testID);
  } catch (error) {
    console.log(error);
  }
};

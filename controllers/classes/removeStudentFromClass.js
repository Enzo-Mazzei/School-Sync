const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = removeStudentFromClass = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const studentId = req.body.studentId;

    // Remove classes form student
    await UserModel.findByIdAndUpdate(studentId, {
      $pull: { classes: classId },
    });

    // Remove student from class
    await ClassModel.findByIdAndUpdate(classId, {
      $pull: { students: studentId },
    });

    res.redirect(`/dashboard/classes/${classId}`);
  } catch (error) {
    next(error);
  }
};

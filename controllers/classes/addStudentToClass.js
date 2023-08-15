const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = addStudentToClass = async (req, res, next) => {
  try {
    const classId = req.params.id;
    const studentId = req.body.studentId;

    // Push classes to user student
    await UserModel.findByIdAndUpdate(studentId, {
      $push: { classes: classId },
    });

    // Push student to classes
    await ClassModel.findByIdAndUpdate(classId, {
      $push: { students: studentId },
    });

    res.redirect(`/dashboard/classes/${classId}`);
  } catch (error) {
    next(error);
  }
};

const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = searchStudent = async (req, res, next) => {
  try {
    const { studentName } = req.query;
    const classID = req.params.id;

    const studentsWithoutClass = await UserModel.find({
      $and: [
        {
          $or: [
            { firstName: { $regex: studentName, $options: "i" } },
            { lastName: { $regex: studentName, $options: "i" } },
          ],
        },
        {
          $or: [{ classes: { $size: 0 } }, { classes: { $exists: false } }],
        },
        { role: "student" },
      ],
    });

    const classDetails = await ClassModel.findById(classID).populate(
      "students"
    );

    res.render("pages/dashboard/class-details", {
      students: studentsWithoutClass,
      classDetails,
    });
  } catch (error) {
    next(error);
  }
};

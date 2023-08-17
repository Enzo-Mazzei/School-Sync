const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = getClass = async (req, res, next) => {
  try {
    const { id } = req.params;

    // class details
    const classDetails = await ClassModel.findOne({ _id: id }).populate(
      "students"
    );

    // students without classes
    const studentsWithoutClass = await UserModel.find({
      $and: [
        {
          $or: [{ classes: { $size: 0 } }, { classes: { $exists: false } }],
        },
        { role: "student" },
      ],
    }).limit(10);

    res.render("pages/dashboard/class-details", {
      classDetails,
      students: studentsWithoutClass,
    });
  } catch (error) {
    next(error);
  }
};

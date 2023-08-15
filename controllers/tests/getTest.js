const Tests = require("../../models/Tests.model");
const ClassModel = require("../../models/Class.model");

module.exports = async (req, res, next) => {
  const { testID } = req.params;
  try {
    const test = await Tests.findOne({ _id: testID })
      .populate({
        path: "grades class",
        populate: {
          path: "student",
        },
      })
      .populate("class");

    const classFind = await ClassModel.findOne({ _id: test.class }).populate(
      "students"
    );

    res.render("pages/dashboard/test", { test, students: classFind.students });
  } catch (error) {
    console.log(error);
  }
};

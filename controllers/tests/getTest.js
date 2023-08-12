const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");

module.exports = async (req, res, next) => {
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

    res.render("pages/dashboard/test", { test, students });
  } catch (error) {
    console.log(error);
  }
};

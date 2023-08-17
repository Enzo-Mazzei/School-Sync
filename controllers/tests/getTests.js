const ClassModel = require("../../models/Class.model");
const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const { currentUser } = req.session;

  try {
    const user = await User.findOne({ _id: currentUser._id }).populate({
      path: "tests",
      options: { sort: { createdAt: -1 } },
    });

    const classesList = await ClassModel.find();

    res.render("pages/dashboard/tests", {
      tests: user.tests,
      classesList,
    });
  } catch (error) {
    console.log(error);
  }
};

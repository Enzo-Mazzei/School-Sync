const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const { currentUser } = req.session;

  try {
    const user = await User.findOne({ _id: currentUser._id }).populate({
      path: "tests classes",
      options: { sort: { createdAt: -1 } },
    });

    res.render("pages/dashboard/tests", {
      tests: user.tests,
      classesList: user.classes,
    });
  } catch (error) {
    console.log(error);
  }
};

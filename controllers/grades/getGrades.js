const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const { currentUser } = req.session;
  try {
    const user = await User.findOne({ _id: currentUser._id }).populate({
      path: "grades",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "test",
        populate: {
          path: "teacher grades",
        },
      },
    });
    res.render("pages/dashboard/grades", {
      grades: user.grades,
    });
  } catch (error) {
    console.log(error);
  }
};

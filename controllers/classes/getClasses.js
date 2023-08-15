const UserModel = require("../../models/User.model");

module.exports = getClasses = async (req, res, next) => {
  try {
    const { currentUser } = req.session;
    const user = await UserModel.findOne({ _id: currentUser._id }).populate(
      "classes"
    );
    res.render("pages/dashboard/classes", { classes: user.classes });
  } catch (error) {
    next(error);
  }
};

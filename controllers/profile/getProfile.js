const User = require("../../models/User.model");

module.exports = getProfile = async (req, res) => {
  try {
    const { currentUser } = req.session;

    const user = await User.findOne({ _id: currentUser._id });
    if (!user) {
      return res.render("pages/dashboard/email-edit", {
        errorMessage: "User not found",
      });
    }

    res.render("pages/dashboard/profile", { user });
  } catch (error) {
    console.log(error);
  }
};

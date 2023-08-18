const UserModel = require("../../models/User.model");

module.exports = getEditEmail = async (req, res) => {
  try {
    const { currentUser } = req.session;

    const user = await UserModel.findOne({ _id: currentUser._id });
    if (!user) {
      return res.render("pages/dashboard/email-edit", {
        errorMessage: "User not found",
      });
    }

    res.render("pages/dashboard/email-edit", { user });
  } catch (error) {
    console.log(error);
  }
};

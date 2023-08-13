const UserModel = require("../../models/User.model");
const bcrypt = require("bcryptjs");

module.exports = postEditPassword = async (req, res) => {
  const { currentUser } = req.session;
  const { oldPassword, newPassword } = req.body;

  try {
    //Handling missing body
    if (!oldPassword || !newPassword) {
      return res.render("pages/dashboard/password-edit", {
        errorMessage: "All fields are require.",
      });
    }

    const user = await UserModel.findOne({ _id: currentUser._id });
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.passwordHash);

    // Handling old password is invalid
    if (!isPasswordMatch) {
      return res.render("pages/dashboard/password-edit", {
        errorMessage: "Invalid old password. Please try again.",
      });
    }

    // Handling new password invalid format
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,30}$/;
    const passwordTest = passwordPattern.test(newPassword);
    if (!passwordTest) {
      return res.render("pages/dashboard/password-edit", {
        errorMessage:
          "The new password must be 6 to 30 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      });
    }

    // Update password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserModel.updateOne(
      { _id: currentUser._id },
      { passwordHash },
      { new: true }
    );

    res.redirect("/dashboard/profile");
  } catch (error) {
    console.error(error);
  }
};

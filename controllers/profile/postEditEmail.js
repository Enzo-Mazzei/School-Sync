const UserModel = require("../../models/User.model");

module.exports = postEditEmail = async (req, res) => {
  try {
    const { currentUser } = req.session;
    const { email } = req.body;

    // Handling missing body
    if (!email) {
      return res.render("pages/dashboard/email-edit", {
        errorMessage: "Email field is require.",
      });
    }

    // Handling invalid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTest = emailPattern.test(email);
    if (!emailTest) {
      return res.render("pages/dashboard/email-edit", {
        errorMessage: "Invalid email format. Please provide a valid email.",
      });
    }

    // Handling email already used
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.render("pages/dashboard/email-edit", {
        errorMessage: "Email is already in use. Please use a different one.",
      });
    }

    // Update email adress
    await UserModel.updateOne({ _id: currentUser._id }, { email });
    res.redirect("/dashboard/profile");
  } catch (error) {
    console.log(error);
  }
};

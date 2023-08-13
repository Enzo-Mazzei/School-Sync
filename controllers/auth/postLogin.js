const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

module.exports = postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Handling missing body errors
    let requiredOptions = {
      errorMessage: "This field is required.",
      email,
      password,
    };

    if (!email && password) {
      requiredOptions.errorEmail = true;
      return res.render("pages/auth/login", requiredOptions);
    } else if (email && !password) {
      requiredOptions.errorPassword = true;
      return res.render("pages/auth/login", requiredOptions);
    } else if (!email && !password) {
      requiredOptions.errorEmail = true;
      requiredOptions.errorPassword = true;
      return res.render("pages/auth/login", requiredOptions);
    }

    // Handling user not found error
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("pages/auth/login", {
        errorMessage: "User not found. Please sign up.",
        errorEmail: true,
        email,
        password,
      });
    }

    // Handling password invalid error
    const isPasswordMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordMatch) {
      return res.render("pages/auth/login", {
        errorMessage: "Invalid password. Please try again.",
        errorPassword: true,
        email,
        password,
      });
    }

    // Login user
    req.session.currentUser = user;
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

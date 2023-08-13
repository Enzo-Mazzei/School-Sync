const User = require("../../models/User.model");
const bcrypt = require("bcryptjs");

module.exports = postSignup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Handling missing body error
    if (!firstName || !lastName || !email || !password) {
      return res.render("pages/auth/signup", {
        errorMessage: "All fields are required.",
      });
    }

    // Handling firstName/lastName error
    const namePattern = /^[a-zA-Z]{3,30}$/;
    const firstNameTest = namePattern.test(firstName);
    const lastNameTest = namePattern.test(lastName);
    if (!firstNameTest || !lastNameTest) {
      return res.render("pages/auth/signup", {
        errorMessage:
          "The first name and last name must consist of 3 to 30 characters, including only letters (both uppercase and lowercase).",
      });
    }

    // Handling email error
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const emailTest = emailPattern.test(email);
    if (!emailTest) {
      return res.render("pages/auth/signup", {
        errorMessage: "Email is invalid.",
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.render("pages/auth/signup", {
        errorMessage: "Email is already in use. Please use a different one.",
      });
    }

    // Handling password error
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{6,30}$/;
    if (!passwordPattern.test(password)) {
      return res.render("pages/auth/signup", {
        errorMessage:
          "Password must be 6 to 30 characters long and contain at least one uppercase letter and one number.",
      });
    }

    const profilePicture =
      "https://ui-avatars.com/api/?size=128&background=random&length=1&color=fff&bold=true&font-size=0.5&name=" +
      firstName;

    const passwordHash = await bcrypt.hash(password, 10);
    const userCreate = await User.create({
      firstName,
      lastName,
      email,
      passwordHash,
      profilePicture,
    });

    return res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

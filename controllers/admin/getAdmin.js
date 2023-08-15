const UserModel = require("../../models/User.model");

module.exports = getAdmin = async (req, res, next) => {
  try {
    const usersList = await UserModel.find().limit(20);
    const users = usersList.map((user) => {
      if (user.role === "admin") return { ...user, isAdmin: true };
      if (user.role === "teacher") return { ...user, isTeacher: true };
      if (user.role === "student") return { ...user, isStudent: true };
    });

    res.render("pages/admin/admin", { users });
  } catch (error) {
    next(error);
  }
};

const UserModel = require("../../models/User.model");

module.exports = getAdmin = async (req, res, next) => {
  try {
    let studentName = req.query.q;

    if (!studentName) {
      studentName = "";
    }

    const usersList = await UserModel.find({
      $or: [
        { firstName: { $regex: studentName, $options: "i" } },
        { lastName: { $regex: studentName, $options: "i" } },
      ],
    }).limit(20);

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

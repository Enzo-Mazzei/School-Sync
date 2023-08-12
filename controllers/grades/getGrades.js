const User = require("../../models/User.model");

module.exports = async (req, res, next) => {
  const { currentUser } = req.session;
  const query = req.query.q;
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

    let grades = [];
    if (query) {
      grades = user.grades.filter((grade) =>
        grade.test.title.toLowerCase().includes(query.toLowerCase())
      );
    } else {
      grades = user.grades;
    }

    res.render("pages/dashboard/grades", { grades: grades });
  } catch (error) {
    console.log(error);
  }
};

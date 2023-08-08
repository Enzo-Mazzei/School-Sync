const Grades = require("../../models/Grades.model");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.session;

  //Fecth grade with id
  const grade = await Grades.findOne({ _id: id }).populate({
    path: "test",
    populate: {
      path: "teacher grades",
    },
  });

  // checking if user is allowed to see the grade

  if (currentUser._id.equals(grade.student)) {
    res.render("pages/dashboard/grade", grade);
  } else {
    res.json({ error: 401 });
  }
};

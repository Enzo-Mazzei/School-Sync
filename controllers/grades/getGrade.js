const Grades = require("../../models/Grades.model");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const { currentUser } = req.session;

  //Fecth grade with id
  const grade = await Grades.findOne({ _id: id }).populate({
    path: "test",
    populate: {
      path: "teacher grades",
      select: "firstName lastName grade",
    },
  });

  if (currentUser._id == grade.student) {
    res.json(grade);
  } else {
    res.json({ error: 401 });
  }
};

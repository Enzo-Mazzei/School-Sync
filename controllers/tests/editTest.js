const User = require("../../models/User.model");
const Tests = require("../../models/Tests.model");

module.exports = async (req, res, next) => {
  const { testID } = req.params;
  const { title, comment, date, maxGrade } = req.body;

  try {
    //Hangle errors
    if (!title || !maxGrade || !date) {
      const [test, students] = await Promise.all([
        Tests.findOne({ _id: testID }).populate({
          path: "grades",
          populate: {
            path: "student",
          },
        }),
        User.find(),
      ]);

      res.render("pages/dashboard/test", {
        test,
        students,
        errorMessage:
          "Missing field(s): Test name, maximum score and date are require!",
      });
      return;
    }

    const testUpdate = await Tests.findOneAndUpdate(
      { _id: testID },
      { title, comment, date, maxGrade },
      { new: true }
    );

    res.redirect("/dashboard/tests/" + testID);
  } catch (error) {
    console.log(error);
  }
};

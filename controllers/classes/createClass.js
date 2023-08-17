const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = createClass = async (req, res, next) => {
  try {
    const { number, letter, year } = req.body;
    const { currentUser } = req.session;

    // Handling missing body
    if (!number || !letter || !year) {
      return res.status(400).json({ errorMessage: "Missing field(s)" });
    }

    // Create classes
    const newClass = await ClassModel.create({
      number,
      letter,
      year,
      teachers: [currentUser._id],
    });

    // Push new classes into teacher user
    const updateUser = await UserModel.updateOne(
      { _id: currentUser._id },
      { $push: { classes: newClass._id } }
    );

    res.redirect("/dashboard/classes");
  } catch (error) {
    next(error);
  }
};

const ClassModel = require("../../models/Class.model");
const UserModel = require("../../models/User.model");

module.exports = deleteClass = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedClass = await ClassModel.findByIdAndDelete(id);

    // Delete class from teachers user
    await UserModel.updateMany(
      { _id: { $in: deletedClass.teachers } },
      { $pull: { classes: deletedClass._id } }
    );

    // Delete class from students user
    await UserModel.updateMany(
      { _id: { $in: deletedClass.students } },
      { $pull: { classes: deletedClass._id } }
    );

    // Need to delete assiocate test

    res.redirect("/dashboard/classes");
  } catch (error) {
    next(error);
  }
};

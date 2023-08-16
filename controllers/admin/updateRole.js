const UserModel = require("../../models/User.model");

module.exports = updateRole = async (req, res, next) => {
  try {
    const { role, userId } = req.body;

    const user = await UserModel.findByIdAndUpdate(
      userId,
      { role },
      { new: true }
    );

    res.status(200).json({
      message: `${user.firstName} ${user.lastName} as been update to: ${user.role}`,
    });
  } catch (error) {
    next(error);
  }
};

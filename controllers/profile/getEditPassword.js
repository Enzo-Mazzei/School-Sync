const UserModel = require("../../models/User.model");

module.exports = getEditPassword = async (req, res) => {
  res.render("pages/dashboard/password-edit");
};

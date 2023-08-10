const Course = require("../../models/Course.model");

module.exports = async (req, res, next) => {
  const { currentUser } = req.session;
  const { name } = req.body;

  const MISSING_NAME_ERROR = "Field missing, please provide a name";

  if (!name) {
    res.json({ errorMessage: MISSING_NAME_ERROR });
    return;
  }

  try {
    const courseCreate = await Course.create({ name });
    res.redirect("/dashboard/courses");
  } catch (error) {
    res.json({ error });
  }
};

const User = require("../models/User.model");

const updateSession = async (req, res, next) => {
  if (req.session.currentUser) {
    req.session.currentUser = await User.findOne({
      _id: req.session.currentUser._id,
    });
    if (req.session.currentUser.role === "teacher") {
      req.session.currentUser.isTeacher = true;
    }
    if (req.session.currentUser.role === "student") {
      req.session.currentUser.isStudent = true;
    }
    req.app.locals.currentUser = req.session.currentUser;
  }
  next();
};

module.exports = updateSession;

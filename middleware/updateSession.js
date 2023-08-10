const User = require("../models/User.model");

const updateSession = async (req, res, next) => {
  if (req.session.currentUser) {
    req.session.currentUser = await User.findOne({
      _id: req.session.currentUser._id,
    });
    req.app.locals.currentUser = req.session.currentUser;
  }
  next();
};

module.exports = updateSession;

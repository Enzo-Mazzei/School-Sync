const isTeacher = (req, res, next) => {
  const { currentUser } = req.session;
  if (currentUser.role !== "teacher") {
    res.redirect("/");
    return;
  }
  next();
};

module.exports = isTeacher;

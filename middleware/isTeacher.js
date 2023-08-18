const isTeacher = (req, res, next) => {
  const { currentUser } = req.session;
  if (currentUser.role !== "teacher" && currentUser.role !== "admin") {
    res.redirect("/dashboard");
    return;
  }
  next();
};

module.exports = isTeacher;

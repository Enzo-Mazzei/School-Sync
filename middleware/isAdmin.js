const isAdmin = (req, res, next) => {
  const { currentUser } = req.session;
  if (currentUser.role !== "admin") {
    res.redirect("/dashboard");
    return;
  }
  next();
};

module.exports = isAdmin;

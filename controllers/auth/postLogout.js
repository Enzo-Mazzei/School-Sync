module.exports = getLogout = (req, res) => {
  req.session.destroy();
  req.app.locals.currentUser = null;
  res.redirect("/");
};

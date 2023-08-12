module.exports = getLogout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

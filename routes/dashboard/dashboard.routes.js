const express = require("express");
const UserModel = require("../../models/User.model");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("pages/dashboard/dashboard");
});

router.get("/get-grades", async (req, res, next) => {
  try {
    const { currentUser } = req.session;

    const user = await UserModel.findOne({ _id: currentUser._id }).populate({
      path: "grades",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "test",
        populate: {
          path: "teacher grades",
        },
      },
    });

    if (user) {
      res.status(200).json({ grades: user.grades });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

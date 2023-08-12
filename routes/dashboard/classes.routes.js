const express = require("express");
const router = express.Router();
const User = require("../../models/User.model");
const Class = require("../../models/Class.model");
const isTeacher = require("../../middleware/isTeacher");

router.get("/classes", async (req, res) => {
  try {
    const classes = await Class.find();
    res.render("pages/dashboard/classes", { classes });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching classes." });
  }
});

router.post("/classes", async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.redirect("/dashboard/classes");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the class." });
  }
});

router.post("/classes/:classId", async (req, res) => {
  try {
    if (req.query._method === "DELETE") {
      await Class.findByIdAndDelete(req.params.classId);
      res.redirect("/dashboard/classes");
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the class." });
  }
});

router.get("/classes/:classId", async (req, res) => {
  try {
    const classId = req.params.classId;
    const classDetails = await Class.findById(classId).populate("students");
    res.render("pages/dashboard/class-details", { classDetails });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching class details." });
  }
});

router.get("/classes/:classId/search", async (req, res) => {
  const { studentName } = req.query;
  const classId = req.params.classId;

  try {
    const studentsWithoutClass = await User.find({
      $or: [
        { firstName: { $regex: studentName, $options: "i" } },
        { lastName: { $regex: studentName, $options: "i" } },
      ],
      class: { $exists: false },
    });

    const classDetails = await Class.findById(classId).populate("students");

    res.render("pages/dashboard/class-details", {
      students: studentsWithoutClass,
      classDetails,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while searching for students." });
  }
});

router.post("/classes/:classId/search", async (req, res) => {
  try {
    const classId = req.params.classId;
    const studentId = req.body.studentId;
    await User.findByIdAndUpdate(studentId, { $set: { class: classId } });
    await Class.findByIdAndUpdate(classId, {
      $push: { students: studentId },
    });

    res.redirect(`/dashboard/classes/${classId}`);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while processing the request.",
    });
  }
});

module.exports = router;

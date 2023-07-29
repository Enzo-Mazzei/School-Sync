const mongoose = require("mongoose");
const { Schema } = mongoose;

const gradesSchema = new Schema(
  {
    grade: {
      type: Number,
      min: [0, "Number can't be 0 or bellow"],
      max: [1000, "Number can't be above 999"],
      required: [true, "Field can't be empty"],
      regex: [/^(\d{1,2}(\.\d{1,2})?)$/, "Should have 2 decimal maximum"],
    },
    maxGrade: {
      type: Number,
      regex: [/^\d+$/, "Should be a integer number"]
      required: [true, "Field can't be empty"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    title: {
      type: String,
      required: [true, "Field can't be empty"],
      trim: true,
      maxlength: [80, "Title can't be above 80 characters"],
    },
    comment: String,
    date: {
      type: Date,
      required: [true, "Field can't be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grades", gradesSchema);

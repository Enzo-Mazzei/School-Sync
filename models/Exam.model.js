const mongoose = require("mongoose");
const { Schema } = mongoose;

const examSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Field can't be empty"],
      trim: true,
      maxlength: [80, "Title can't be above 80 characters"],
    },
    comment: String,
    avgGrade: Number,
    maxGrade: {
      type: Number,
      regex: [/^\d+$/, "Should be a integer number"],
      required: [true, "Field can't be empty"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Courses",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    grades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades",
      },
    ],
    date: {
      type: Date,
      required: [true, "Field can't be empty"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exams", examSchema);

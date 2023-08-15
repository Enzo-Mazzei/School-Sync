const mongoose = require("mongoose");
const { Schema } = mongoose;

const testSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Field can't be empty"],
      trim: true,
      maxlength: [80, "Title can't be above 80 characters"],
    },
    comment: String,
    avgGrade: {
      type: Number,
      default: 0,
    },
    maxGrade: {
      type: Number,
      regex: [/^\d+$/, "Should be a integer number"],
      required: [true, "Field can't be empty"],
    },
    date: {
      type: Date,
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
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tests", testSchema);

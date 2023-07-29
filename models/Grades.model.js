const mongoose = require("mongoose");
const { Schema } = mongoose;

const gradesSchema = new Schema(
  {
    grade: {
      type: Number,
      min: 0,
      max: 1000,
      required: [true, "Field can't be empty"],
      validate: {
        validator: function (v) {
          return /^(\d{1,2}(\.\d{1,2})?)$/.test(v);
        },
        message: (input) =>
          `${input.value} is not a valid grade. Should have up to two decimal places.`,
      },
    },
    maxGrade: {
      type: Number,
      validate: {
        validator: function (v) {
          return Number.isInteger(v);
        },
        message: (input) =>
          `${input.value} is not a valid max grade. Should be an integer.`,
      },
      required: [true, "Field can't be empty"],
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

module.exports = mongoose.model("Grade", gradesSchema);

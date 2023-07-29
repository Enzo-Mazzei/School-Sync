const mongoose = require("mongoose");
const { Schema } = mongoose;

const gradesSchema = new Schema(
  {
    grade: {
      type: Number,
      min: 0,
      max: 1000,
      required: true,
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
      required: true,
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
      required: true,
      trim: true,
      maxlength: 80,
      validate: {
        validator: function (v) {
          return v.trim().length > 0;
        },
        message: "Title should not be empty and should be below 80 characters.",
      },
    },
    comment: String,
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grade", gradesSchema);

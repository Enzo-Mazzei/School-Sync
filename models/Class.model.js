const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema(
  {
    number: {
      type: Number,
      min: 1,
      max: 99,
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v >= 1 && v <= 99;
        },
        message: (input) =>
          `${input.value} is not a valid class number. It should be an integer between 1 and 99.`,
      },
    },
    letter: {
      type: String,
      match: /^[A-Za-z]$/,
      required: true,
      validator: function (v) {
        return /^[A-Za-z]$/.test(v);
      },
      message: (input) =>
        `${input.value} is not a valid letter. It should be exactly one letter.`,
    },
    year: {
      type: Number,
      min: new Date().getFullYear() - 5,
      max: new Date().getFullYear() + 200,
      required: true,
    },
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    teachers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);

const mongoose = require("mongoose");
const { Schema } = mongoose;

const classSchema = new Schema(
  {
    number: {
      type: Number,
      min: [1, "Class can't 0 or below"],
      max: [1, "Number can't be above 100"],
      required: [true, "Field can't be empty"],
    },
    letter: {
      type: String,
      match: [/^[A-Za-z]$/, "Needs to be one letter"],
      required: [true, "Field can't be empty"],
    },
    year: {
      type: Number,
      min: new Date().getFullYear() - 5,
      max: new Date().getFullYear() + 200,
      required: [true, "Field can't be empty"],
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

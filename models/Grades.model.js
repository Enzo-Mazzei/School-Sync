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
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tests",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Grades", gradesSchema);

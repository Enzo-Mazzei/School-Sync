const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Field can't be empty"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Courses", courseSchema);

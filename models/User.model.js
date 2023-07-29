const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      regex: [
        /^[A-Za-z\s]+$/,
        "Name can't contain special characters or numbers",
      ],
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      regex: [
        /^[A-Za-z\s]+$/,
        "Name can't contain special characters or numbers",
      ],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      regex: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Email needs to be valid"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    role: {
      type: String,
      required: true,
      default: "student",
    },
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
    grades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grade",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);

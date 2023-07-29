const mongoose = require("mongoose");
const { Schema } = mongoose;

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
const nameRegex = /^[A-Za-z\s]+$/;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return nameRegex.test(v.trim());
        },
        message:
          "Last name should only contain normal characters (letters and spaces).",
      },
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: function (v) {
          return nameRegex.test(v.trim());
        },
        message:
          "Last name should only contain normal characters (letters and spaces).",
      },
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      validate: [validateEmail, "Please provide a valid email address."],
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
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

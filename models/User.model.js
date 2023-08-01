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
      regex: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Email needs to be valid",
      ],
    },
    passwordHash: {
      type: String,
      required: true,
    },
    profilePicture: String,
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classes",
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "teacher", "admin"],
      default: "student",
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Courses",
      },
    ],
    grades: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Grades",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Users", userSchema);

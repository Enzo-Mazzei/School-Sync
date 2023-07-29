const mongoose = require('mongoose');
const { Schema } = mongoose;

const gradesSchema = new Schema({
  grade: {
    type: Number,
    min: 0,
    max: 1000,
    required: true,
    validate: {
        validator: function (v) {
          return /^(\d{1,2}(\.\d{1,2})?)$/.test(v);
        },
        message: input => `${input.value} is not a valid grade. Should have up to two decimal places.`,
      },
  },
  maxGrade: {
    type: Number,
    validate: {
      validator: function (v) {
        return Number.isInteger(v);
      },
      message: input => `${input.value} is not a valid max grade. Should be an integer.`,
    },
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 80,
  },
  comment: String,
  date: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Grade', gradesSchema);

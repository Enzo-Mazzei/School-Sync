const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  passwordHash: {
    type: String,
    required: true,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  role: {
    type: String,
    required: true,
    default: 'student',
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
  grades: [{
    type: Schema.Types.ObjectId,
    ref: 'Grade',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  timestamps: true,  
});

module.exports = mongoose.model('User', userSchema);

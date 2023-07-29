const mongoose = require('mongoose');
const { Schema } = mongoose;

const classSchema = new Schema({
  number: {
    type: Number,
    min: 1,
    max: 99,
    required: true,
  },
  letter: {
    type: String,
    match: /^[A-Za-z]$/,
    required: true,
    validator: function (v) {
        return /^[A-Za-z]$/.test(v);
      },
      message: input => `${input.value} is not a valid letter. It should be exactly one letter.`,
  },
  year: {
    type: Number,
    min: new Date().getFullYear()-5,
    max: new Date().getFullYear()+200,
    required: true,
  },
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  teachers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
  },
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

module.exports = mongoose.model('Class', classSchema);

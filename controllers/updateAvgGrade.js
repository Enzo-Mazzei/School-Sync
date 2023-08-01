const Exam = require("../models/Exam.model");

module.exports = (grades, id) => {
  return new Promise(async (resolve, reject) => {
    // Calculate the average of all the grades in Exam document
    let sumGrade = grades.reduce((a, b) => a + b.grade, 0);
    let avgGrade = Math.round((sumGrade / grades.length) * 100) / 100 || 0;

    // Update the avgGrade in Exam document
    try {
      const examUpdate = await Exam.findOneAndUpdate(
        { _id: id },
        { avgGrade: avgGrade },
        { new: true }
      );

      resolve(examUpdate);
    } catch (error) {
      reject(error);
    }
  });
};

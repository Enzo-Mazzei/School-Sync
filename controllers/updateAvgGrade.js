const Test = require("../models/Tests.model");

module.exports = (grades, testID) => {
  return new Promise(async (resolve, reject) => {
    // Calculate the average of all the grades in Test document
    let sumGrade = grades.reduce((a, b) => a + b.grade, 0);
    let avgGrade = Math.round((sumGrade / grades.length) * 100) / 100 || 0;

    // Update the avgGrade in Test document
    try {
      const testUpdate = await Test.findOneAndUpdate(
        { _id: testID },
        { avgGrade: avgGrade },
        { new: true }
      );

      resolve(testUpdate);
    } catch (error) {
      reject(error);
    }
  });
};

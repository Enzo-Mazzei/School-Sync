document.addEventListener("DOMContentLoaded", () => {
  const gradesItem = document.querySelectorAll(".grades-item");

  gradesItem.forEach((item) => {
    const score = item.querySelector(".grades-item__score");

    const grade = Number(item.dataset.grade);
    const maxGrade = Number(item.dataset.maxGrade);

    console.log(grade, maxGrade);

    const ratio = grade / maxGrade;

    if (ratio >= 0.75) {
      score.classList.add("grades-item__score-green");
    } else if (ratio >= 0.5) {
      score.classList.add("grades-item__score-orange");
    } else {
      score.classList.add("grades-item__score-red");
    }
  });
});

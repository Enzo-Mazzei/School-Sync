document.addEventListener("DOMContentLoaded", () => {
  const gradeTrending = document.querySelector("#grade-trending");
  const grade = gradeTrending.dataset.grade;
  const avgGrade = gradeTrending.dataset.avgGrade;

  if (grade >= avgGrade) {
    gradeTrending.style.color = "rgb(0,255,0)";
    gradeTrending.innerHTML = "trending_up";
  } else {
    gradeTrending.style.color = "rgb(255,0,0)";
    gradeTrending.innerHTML = "trending_down";
  }
});

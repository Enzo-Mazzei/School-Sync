document.addEventListener("DOMContentLoaded", () => {
  const gradeItem = document.querySelectorAll(".grades-container__item");

  gradeItem.forEach((item) => {
    const $grade = item.children[1].children[0].children[0];
    const $maxGrade = item.children[1].children[0].children[1].children[0];
    const $icon = item.children[0];

    const grade = Number($grade.innerHTML);
    const maxGrade = Number($maxGrade.innerHTML);

    $grade.innerHTML = formatNumber(grade);

    const icon = item.children[0];

    const ratio = grade / maxGrade;

    if (ratio >= 0.75) {
      $icon.classList.add("grades-container__item-icon-green");
    } else if (ratio >= 0.5) {
      $icon.classList.add("grades-container__item-icon-orange");
    } else {
      $icon.classList.add("grades-container__item-icon-red");
    }
  });
});

function formatNumber(number) {
  const formattedNumber = number.toFixed(1);
  if (formattedNumber.length === 3) {
    return "0" + formattedNumber;
  } else {
    return "" + formattedNumber;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const formSelect = document.querySelector("#form-select");
  const formOptions = document.querySelector("#form-options");
  const formSelectItem = document.querySelectorAll(".form-options__item");
  const formSelectId = document.querySelector("#form-select-id");

  formSelectItem.forEach(function (item) {
    item.addEventListener("click", () => {
      formSelect.value = item.dataset.name;
      formSelectId.value = item.dataset.id;
    });
  });

  window.addEventListener("click", (e) => {
    const offsetY = formSelect.offsetTop + formSelect.offsetHeight + 1;
    formOptions.style.top = offsetY;
    if (e.target === formSelect) {
      formOptions.classList.toggle("form-options__hidden");
    } else {
      formOptions.classList.add("form-options__hidden");
    }
  });
});

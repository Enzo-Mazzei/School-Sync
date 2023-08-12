document.addEventListener("DOMContentLoaded", () => {
  const errorClose = document.querySelector(".error-close");
  const errorContainer = document.querySelector(".error-container");

  errorClose.addEventListener("click", () => {
    errorContainer.style.transform = `translateY(-${errorContainer.offsetHeight}px)`;
  });
});

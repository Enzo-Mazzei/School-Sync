document.addEventListener("DOMContentLoaded", () => {
  const toggleModalButton = document.querySelector("#open-modal-button");
  const toggleModalIcon = document.querySelector("#open-modal-button span");
  const closeModalButton = document.querySelector(".modal__close");
  const modal = document.querySelector(".modal__container");

  window.addEventListener("click", function (e) {
    if (e.target === toggleModalButton || e.target === toggleModalIcon) {
      modal.classList.remove("modal__container-hidden");
      modal.parentNode.classList.remove("modal__hidden");
    } else if (e.target === closeModalButton) {
      modal.classList.add("modal__container-hidden");
      modal.parentNode.classList.add("modal__hidden");
    } else if (
      !closeModalButton.contains(e.target) &&
      !modal.contains(e.target)
    ) {
      modal.classList.add("modal__container-hidden");
      modal.parentNode.classList.add("modal__hidden");
    }
  });
});

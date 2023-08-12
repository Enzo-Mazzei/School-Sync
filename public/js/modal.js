document.addEventListener("DOMContentLoaded", () => {
  const toggleModalButton = document.querySelector("#open-modal-button");
  const closeModalButton = document.querySelector(".modal__close");
  const modal = document.querySelector(".modal__container");
  const modalBackground = document.querySelector(".modal");

  toggleModalButton.addEventListener("click", () => {
    modal.classList.remove("modal__container-hidden");
    modal.parentNode.classList.remove("modal__hidden");
  });

  closeModalButton.addEventListener("click", () => {
    modal.classList.add("modal__container-hidden");
    modal.parentNode.classList.add("modal__hidden");
  });

  modalBackground.addEventListener("click", function (e) {
    if (!closeModalButton.contains(e.target) && !modal.contains(e.target)) {
      modal.classList.add("modal__container-hidden");
      modal.parentNode.classList.add("modal__hidden");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const createTestButton = document.querySelector("#create-test-button");
  const closeModalButton = document.querySelector("#close-modal-button");
  const createTestModal = document.querySelector("#create-test-modal");

  createTestButton.addEventListener("click", () => {
    createTestModal.classList.toggle("tests-modal__hidden");
  });

  closeModalButton.addEventListener("click", () => {
    createTestModal.classList.toggle("tests-modal__hidden");
  });
});

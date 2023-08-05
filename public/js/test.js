document.addEventListener("DOMContentLoaded", () => {
  const textarea = document.querySelector("textarea");
  const editBtn = document.querySelector("#edit-button");
  const editScreen = document.querySelector("#edit-screen");
  const informationsScreen = document.querySelector("#informations-screen");
  const cancelBtn = document.querySelector("#cancel-button");

  editBtn.addEventListener("click", () => {
    editScreen.classList.toggle("hidden");
    textarea.style.height = `${textarea.scrollHeight}px`;
    informationsScreen.classList.toggle("hidden");
  });

  cancelBtn.addEventListener("click", () => {
    editScreen.classList.toggle("hidden");
    informationsScreen.classList.toggle("hidden");
  });
});

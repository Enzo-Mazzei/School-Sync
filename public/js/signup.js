/* SIGNUP JS */

document.addEventListener("DOMContentLoaded", () => {
  const firstName = document.querySelector(".form__container #firstName input");
  const lastName = document.querySelector(".form__container #lastName input");
  const email = document.querySelector(".form__container #email");
  const password = document.querySelector(".form__container #password");
  const submit = document.querySelector(".form__container #submit");
  const nextButton = document.querySelector(".form__container #next");
  const errorMessage = document.querySelector(
    ".form__container #error-message"
  );
  nextButton.addEventListener("click", (e) => {
    console.log("lol");
    if (firstName.value && lastName.value) {
      firstName.parentNode.style.display = "none";
      lastName.parentNode.style.display = "none";
      next.style.display = "none";
      errorMessage.style.display = "none";
      email.style.display = "block";
      password.style.display = "block";
      submit.style.display = "block";
    } else {
      errorMessage.innerHTML = `
        <p class="form__error__message">
          <span class="material-symbols-outlined">error</span>
          <span>All fields are required!</span>
        </p>
        <br />
        `;
    }
  });
});

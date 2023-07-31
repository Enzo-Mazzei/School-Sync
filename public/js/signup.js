/* SIGNUP JS */

document.addEventListener("DOMContentLoaded", () => {
  const firstName = document.querySelector("input[name=firstName]");
  const lastName = document.querySelector("input[name=lastName]");
  const email = document.querySelector("input[name=email]");
  const password = document.querySelector("input[name=password]");
  const submitButton = document.querySelector("button[type=submit]");
  const nextButton = document.querySelector("button[type=button]");
  const errorMessage = document.querySelector(".auth-form__error-container");

  nextButton.addEventListener("click", (e) => {
    if (firstName.value && lastName.value) {
      firstName.parentNode.classList.add("hidden");
      lastName.parentNode.classList.add("hidden");
      nextButton.classList.add("hidden");
      errorMessage.classList.add("hidden");
      email.parentNode.classList.remove("hidden");
      password.parentNode.classList.remove("hidden");
      submitButton.classList.remove("hidden");
    } else {
      errorMessage.classList.remove("hidden");
      errorMessage.innerHTML = `
        <span class="auth-form__error-icon material-symbols-outlined">
          error
        </span>
        <span class="auth-form__error-text">All fields are required.</span>
      `;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  });
});

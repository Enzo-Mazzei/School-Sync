let logo = document.querySelector("#logo");
let menu = document.querySelector("#st-container");
let notMenu = document.querySelector(".st-pusher");
let effect;

logo.addEventListener("click", toggleMenu);

function toggleMenu() {
  effect = "st-effect-1";
  menu.classList.toggle(effect);
  menu.classList.toggle("st-menu-open");
  logo.classList.toggle("open");
  let bars = document.querySelectorAll(".menu-icon .bar");
  bars.forEach((bar) => bar.classList.toggle("cross"));
}

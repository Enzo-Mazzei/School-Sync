let logo = document.querySelector("#open-modal");
let menu = document.querySelector("#container");
let sidebar = document.querySelector(".sidebar");
let minisidebar = document.querySelector("#mini-sidebar");
logo.addEventListener("click", toggleMenu);

function toggleMenu() {
  menu.classList.toggle("open");
  sidebar.classList.toggle("open");
  minisidebar.classList.toggle("open");
}

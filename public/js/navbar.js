/* NAVBAR MENU */

document.addEventListener("DOMContentLoaded", () => {
  const navbarMenuBtn = document.querySelector("#navbar-menu-btn");
  const navbarMenu = document.querySelector("#navbar-menu");
  const navbarMenuClose = document.querySelector("#navbar-menu-close");

  navbarMenuBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("navbar__user__menu-active");
  });

  navbarMenuClose.addEventListener("click", () => {
    navbarMenu.classList.toggle("navbar__user__menu-active");
  });

  window.addEventListener("click", function (e) {
    if (!navbarMenu.contains(e.target) && !navbarMenuBtn.contains(e.target)) {
      navbarMenu.classList.remove("navbar__user__menu-active");
    }
  });
});

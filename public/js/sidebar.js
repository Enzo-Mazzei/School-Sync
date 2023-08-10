document.addEventListener("DOMContentLoaded", () => {
  const openSidebar = document.querySelector("#open-sidebar");
  const closeSidebar = document.querySelector("#close-sidebar");
  const sidebar = document.querySelector(".sidebar");

  openSidebar.addEventListener("click", () => {
    sidebar.classList.add("sidebar-open");
  });

  closeSidebar.addEventListener("click", () => {
    sidebar.classList.remove("sidebar-open");
  });
});

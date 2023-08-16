document.addEventListener("DOMContentLoaded", () => {
  const selects = document.querySelectorAll(".admin-select");
  const notifs = document.querySelector("#admin-notifs");

  selects.forEach((select) => {
    select.addEventListener("change", () => {
      const role = select.value;
      const { userId } = select.dataset;

      const data = { role, userId };
      fetch("/dashboard/update-role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message) {
            notifs.innerHTML = data.message;
            notifs.style.display = "block";
            setTimeout(() => {
              notifs.style.display = "none";
            }, 1000 * 5);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  });
});

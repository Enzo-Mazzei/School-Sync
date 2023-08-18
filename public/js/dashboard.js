document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await fetch("/dashboard/get-grades");
    const data = await result.json();

    const grades = data.grades.map((item) => item.grade);
    const dates = data.grades.map((item) => {
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = new Date(item.test.date);
      return date.toLocaleDateString("en-US", options);
    });
    const average = data.grades.map((item) => item.test.avgGrade);

    const ctx = document.getElementById("student-chart");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "My Grade",
            data: grades,
            borderWidth: 3,
            fill: true,
            backgroundColor: "rgba(113, 44, 249, 0.1)",
            borderColor: "rgb(113, 44, 249)",
          },
          {
            label: "Average Class Grade",
            data: average,
            borderWidth: 3,
            fill: true,
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgb(255, 255, 255)",
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            min: 0,
            max: 20,
          },
        },
        bezierCurve: true,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const facultyStats = [
  {
    title: "Total Students",
    value: "156",
    icon: "bi-people",
    color: "primary",
  },
  {
    title: "Today's Attendance",
    value: "89%",
    icon: "bi-check2-circle",
    color: "success",
  },
  {
    title: "Pending Grades",
    value: "12",
    icon: "bi-pencil-square",
    color: "warning",
  },
  {
    title: "Messages",
    value: "5",
    icon: "bi-chat-dots",
    color: "danger",
  },
];

const facultyCourses = [
  {
    name: "Data Structures & Algorithms",
    meta: "CS-301 • Section A",
    students: "42",
    attendance: "89%",
    rating: "4.7",
  },
  {
    name: "Machine Learning",
    meta: "CS-402 • Section B",
    students: "38",
    attendance: "92%",
    rating: "4.9",
  },
];

function renderFacultyStats() {
  const statsContainer = document.getElementById("facultyStatsRow");
  if (!statsContainer) {
    return;
  }

  statsContainer.innerHTML = facultyStats
    .map(
      (item) => `
      <div class="col-lg-3 col-md-6">
        <div class="card shadow-sm border-0 h-100">
          <div class="card-body d-flex align-items-center gap-3">
            <div class="bg-${item.color} text-white rounded-3 d-flex align-items-center justify-content-center" style="width:48px;height:48px;">
              <i class="bi ${item.icon} fs-4"></i>
            </div>
            <div>
              <small class="text-muted">${item.title}</small>
              <h4 class="mb-0 fw-bold">${item.value}</h4>
            </div>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

function renderFacultyCourses() {
  const coursesContainer = document.getElementById("facultyCoursesRow");
  if (!coursesContainer) {
    return;
  }

  coursesContainer.innerHTML = facultyCourses
    .map(
      (course) => `
      <div class="col-lg-6">
        <div class="card course-card p-3 h-100">
          <h5 class="fw-bold">${course.name}</h5>
          <small class="text-muted">${course.meta}</small>

          <div class="course-stats mt-3">
            <div><strong>${course.students}</strong><br><small>Students</small></div>
            <div><strong>${course.attendance}</strong><br><small>Attendance</small></div>
            <div><strong>${course.rating}</strong><br><small>Rating</small></div>
          </div>

          <div class="d-flex gap-2 course-actions mt-3">
            <button class="btn btn-soft w-100"><i class="bi bi-people"></i> Attendance</button>
            <button class="btn btn-primary w-100"><i class="bi bi-pencil-square"></i> Grade</button>
          </div>
        </div>
      </div>
    `,
    )
    .join("");
}

function initFacultyCharts() {
  const weeklyCtx = document.getElementById("weeklyClassesChart");
  if (weeklyCtx && window.Chart) {
    new Chart(weeklyCtx, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [3, 4, 2, 5, 4, 1, 0],
            tension: 0.4,
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
      },
    });
  }

  const distCtx = document.getElementById("courseDistributionChart");
  if (distCtx && window.Chart) {
    new Chart(distCtx, {
      type: "doughnut",
      data: {
        labels: ["DSA", "ML", "Web Dev", "DBMS"],
        datasets: [{ data: [40, 30, 25, 31] }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: "bottom" } },
      },
    });
  }
}

async function bootstrapFacultyDashboard() {
  await initLayout({ sidebar: "/layouts/sidebar-faculty.html" });
  renderFacultyStats();
  renderFacultyCourses();
  initFacultyCharts();
}

const studentSchedule = [
  {
    time: "09:00 AM",
    subject: "Data Structures",
    room: "Lab 204",
    status: "Done",
    tone: "success",
  },
  {
    time: "11:00 AM",
    subject: "Java Programming",
    room: "Room 302",
    status: "Now",
    tone: "primary",
  },
  {
    time: "02:00 PM",
    subject: "Software Engineering",
    room: "Lab 105",
    status: "Next",
    tone: "secondary",
  },
];

const recentAssignments = [
  {
    title: "Core Java: Logic Building",
    dueLabel: "Due Today",
    dueClass: "text-danger fw-semibold",
    href: "/student/academics/materials.html",
  },
  {
    title: "Frontend: Component UI",
    dueLabel: "Due Tomorrow",
    dueClass: "text-muted",
    href: "/student/academics/materials.html",
  },
];

function renderSchedule() {
  const scheduleContainer = document.getElementById("todaySchedule");
  if (!scheduleContainer) {
    return;
  }

  scheduleContainer.innerHTML = studentSchedule
    .map(
      (item) => `
      <div class="schedule-row compact border-start border-4 border-${item.tone} ${item.status === "Now" ? "shadow-sm bg-white" : ""}">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <div class="time-label ${item.status === "Now" ? "text-primary" : "text-dark"}">${item.time}</div>
            <div class="subject-label ${item.status === "Now" ? "fw-bold text-dark" : "text-secondary"}">${item.subject}</div>
            <div class="location-label text-muted">${item.room}</div>
          </div>
          <div class="status-label text-${item.tone} ${item.status === "Now" ? "pulse-text" : ""}">${item.status}</div>
        </div>
      </div>
    `,
    )
    .join("");
}

function renderAssignments() {
  const assignmentsContainer = document.getElementById("recentAssignments");
  if (!assignmentsContainer) {
    return;
  }

  assignmentsContainer.innerHTML = recentAssignments
    .map(
      (item, index) => `
      <div class="${index === 0 ? "mb-3" : "mb-0"}">
        <p class="mb-0 fw-bold small">${item.title}</p>
        <div class="d-flex justify-content-between align-items-center mt-1">
          <small class="${item.dueClass}">${item.dueLabel}</small>
          <a href="${item.href}" class="btn btn-sm btn-outline-primary py-0 px-2 rounded-pill" style="font-size: 11px">View Materials</a>
        </div>
      </div>
    `,
    )
    .join("");
}

function updateDashboardDate() {
  const dateOptions = { weekday: "long", month: "long", day: "numeric" };
  const shortDate = new Date().toLocaleDateString("en-US", dateOptions);

  const bannerDate = document.getElementById("bannerDateDisplay");
  if (bannerDate) {
    bannerDate.textContent = shortDate;
  }
}

async function bootstrapStudentDashboard() {
  await initLayout({ sidebar: "/layouts/sidebar-student.html" });
  renderSchedule();
  renderAssignments();
  updateDashboardDate();
}

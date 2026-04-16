/* assets/js/auth/login.js */

const mockUsers = [
  {
    email: "student@college.edu",
    password: "student123",
    role: "student",
    redirect: "/student/dashboard.html",
  },
  {
    email: "faculty@college.edu",
    password: "faculty123",
    role: "faculty",
    redirect: "/faculty/dashboard.html",
  },
  {
    email: "admission@college.edu",
    password: "admission123",
    role: "admission",
    redirect: "/admission/dashboard.html",
  },
  {
    email: "admin@college.edu",
    password: "admin123",
    role: "admin",
    redirect: "/super-admin/dashboard.html",
  },
];

function setRoleDefaults(role) {
  const roleInput = document.getElementById("role");
  const title = document.getElementById("loginTitle");

  if (roleInput) {
    roleInput.value = role;
  }

  if (title) {
    title.textContent = `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;
  }
}

function setLoginMessage(text, tone = "muted") {
  const message = document.getElementById("loginMessage");
  if (!message) {
    return;
  }

  message.className = `small mb-3 text-${tone}`;
  message.textContent = text;
}

function getRoleFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const role = params.get("role") || "student";
  const allowedRoles = ["student", "faculty", "admission", "admin"];
  return allowedRoles.includes(role) ? role : "student";
}

function handleDemoLogin(event) {
  event.preventDefault();

  const role = document.getElementById("role")?.value;
  const email = document.getElementById("email")?.value.trim().toLowerCase();
  const password = document.getElementById("password")?.value;

  const matchedUser = mockUsers.find(
    (user) => user.role === role && user.email === email && user.password === password,
  );

  if (!matchedUser) {
    setLoginMessage(
      "Invalid demo credentials for selected role. Try configured mock users only.",
      "danger",
    );
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify({
      email: matchedUser.email,
      role: matchedUser.role,
      isLoggedIn: true,
      isDemo: true,
    }),
  );

  setLoginMessage("Demo login successful. Redirecting...", "success");
  window.location.href = matchedUser.redirect;
}

document.addEventListener("DOMContentLoaded", () => {
  const initialRole = getRoleFromUrl();
  setRoleDefaults(initialRole);

  const roleInput = document.getElementById("role");
  if (roleInput) {
    roleInput.addEventListener("change", (event) => {
      setRoleDefaults(event.target.value);
    });
  }

  setLoginMessage("Demo access only: use configured role-based mock credentials.");

  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleDemoLogin);
  }
});

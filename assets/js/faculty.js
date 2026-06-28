/* assets/js/faculty.js */

async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function setActiveSidebar() {
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll("#sidebarContainer a");

  links.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    link.classList.remove("active");
    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

function initSidebarControls() {
  const collapseBtn = document.querySelector("#collapseSidebarBtn");
  const sidebar = document.querySelector("#sidebar");

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener("click", () => {
      sidebar.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-collapsed");
    });
  }

  const mobileBtn = document.querySelector("#menuToggle");

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
}

function initHeaderControls(basePath) {
  const profileButton = document.getElementById("profileButton");
  if (profileButton) {
    profileButton.setAttribute("href", basePath + "faculty/profile.html");
  }
}

async function initLayout(basePath) {
  await loadComponent(
    "sidebarContainer",
    basePath + "layouts/sidebar-faculty.html",
  );
  await loadComponent("headerContainer", basePath + "layouts/header.html");
  await loadComponent("footerContainer", basePath + "layouts/footer.html");

  setActiveSidebar();
  initSidebarControls();
  initHeaderControls(basePath);
}

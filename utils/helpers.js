/**
 * Shared layout helpers used across role dashboards.
 */

async function loadComponent(containerId, filePath) {
  const container = document.getElementById(containerId);
  if (!container) {
    return;
  }

  const response = await fetch(filePath);
  const html = await response.text();
  container.innerHTML = html;
}

function setActiveSidebar() {
  const currentPage = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll("#sidebarContainer a");

  links.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop();
    link.classList.toggle("active", linkPage === currentPage);
  });
}

function initSidebarControls() {
  const sidebar = document.querySelector("#sidebar");
  if (!sidebar) {
    return;
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest("#menuToggle")) {
      sidebar.classList.toggle("show");
    }

    if (event.target.closest("#collapseSidebarBtn")) {
      sidebar.classList.toggle("collapsed");
      document.body.classList.toggle("sidebar-collapsed");
    }
  });
}

/**
 * Initializes shared layout fragments.
 * @param {{ sidebar: string, header?: string, footer?: string }} config
 */
async function initLayout(config) {
  const {
    sidebar,
    header = "/layouts/header.html",
    footer = "/layouts/footer.html",
  } = config;

  await Promise.all([
    loadComponent("sidebarContainer", sidebar),
    loadComponent("headerContainer", header),
    loadComponent("footerContainer", footer),
  ]);

  setActiveSidebar();
  initSidebarControls();
}

async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  const res = await fetch(file);
  if (!res.ok) throw new Error(`Failed to load component: ${file}`);

  el.innerHTML = await res.text();

  if (id === 'sidebar-container') {
    setActiveSidebarLink();
  }

  if (id === 'header-container' || id === 'sidebar-container') {
    initSidebarControls();
  }
}

function setActiveSidebarLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    link.classList.toggle('active', href === currentPath);
  });
}

function initSidebarControls() {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const mobileBtn = document.getElementById('menuToggle');
  if (mobileBtn && !mobileBtn.dataset.boundSidebar) {
    mobileBtn.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
    mobileBtn.dataset.boundSidebar = 'true';
  }

  const collapseBtn = document.getElementById('collapseSidebarBtn');
  if (collapseBtn && !collapseBtn.dataset.boundSidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      document.body.classList.toggle('sidebar-collapsed');
    });
    collapseBtn.dataset.boundSidebar = 'true';
  }
}

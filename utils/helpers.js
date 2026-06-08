async function loadComponent(id, file) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(file);
    if (!res.ok) throw new Error(`Failed to load component: ${file}`);

    el.innerHTML = await res.text();

    // Initialize specific controls based on what was just loaded
    if (id === 'sidebar-container') {
      setActiveSidebarLink();
      initSidebarControls();
    }

    if (id === 'header-container') {
      initSidebarControls(); // Attach toggle events to header buttons
      initHeaderControls();  // Dynamically set profile link
    }
  } catch (error) {
    console.error("Error loading component:", error);
  }
}

function setActiveSidebarLink() {
  const currentPath = window.location.pathname;
  document.querySelectorAll('.sidebar-nav a').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Use includes to match paths flexibly (handles relative paths)
    if (currentPath.includes(href.replace('../', '').replace('./', ''))) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
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

function getProfilePathByRole(pathname) {
  if (pathname.includes('/student/')) return '/student/profile.html';
  if (pathname.includes('/faculty/')) return '/faculty/profile.html';
  if (pathname.includes('/admission/')) return '/admission/profile.html';
  if (pathname.includes('/super-admin/')) return '/super-admin/settings.html';
  return '/layouts/public/login.html';
}

function initHeaderControls() {
  const profileButton = document.getElementById('profileButton');
  if (!profileButton) return;

  profileButton.setAttribute('href', getProfilePathByRole(window.location.pathname));
}

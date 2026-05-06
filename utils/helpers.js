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

// NEW: Function to dynamically route the profile button based on role/path
function initHeaderControls() {
  const profileButton = document.getElementById("profileButton");
  if (!profileButton) return;

  const currentPath = window.location.pathname;
  let targetProfilePath = "#";

  // Determine path depth to go back to root if necessary (basic fallback handling)
  const isNested = currentPath.split('/').length > 3; 
  const prefix = isNested ? "../../" : "../";

  // Determine role based on URL structure and map to correct file
  if (currentPath.includes("/student/")) {
    targetProfilePath = "profile.html"; 
    // Assuming you are in /student/dashboard.html, going to profile.html is on the same level
  } else if (currentPath.includes("/faculty/")) {
    targetProfilePath = "profile.html";
  } else if (currentPath.includes("/admission/")) {
    targetProfilePath = "profile.html";
  } else if (currentPath.includes("/super-admin/")) {
    targetProfilePath = "settings.html";
  } else {
    // Fallback if accessed outside of a role folder
    targetProfilePath = "../public/login.html"; 
  }

  // Update the href attribute
  profileButton.setAttribute("href", targetProfilePath);
}
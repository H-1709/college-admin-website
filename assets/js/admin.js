async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

function setActiveSidebar() {
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('#sidebarContainer a').forEach((link) => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href')?.split('/').pop();
    if (linkPage === currentPage) link.classList.add('active');
  });
}

function initSidebarControls() {
  const collapseBtn = document.querySelector('#collapseSidebarBtn');
  const sidebar = document.querySelector('#sidebar');
  const mobileBtn = document.querySelector('#menuToggle');

  if (collapseBtn && sidebar) {
    collapseBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      document.body.classList.toggle('sidebar-collapsed');
    });
  }

  if (mobileBtn && sidebar) {
    mobileBtn.addEventListener('click', () => sidebar.classList.toggle('show'));
  }
}

async function initAdminLayout(basePath) {
  await loadComponent('sidebarContainer', basePath + 'layouts/sidebar-admin.html');
  await loadComponent('headerContainer', basePath + 'layouts/header.html');
  await loadComponent('footerContainer', basePath + 'layouts/footer.html');
  setActiveSidebar();
  initSidebarControls();
}

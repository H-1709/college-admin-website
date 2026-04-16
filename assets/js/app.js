// File: assets/js/app.js

document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject Global Header and Footer
    loadComponent('header-placeholder', '/layouts/header.html');
    loadComponent('footer-placeholder', '/layouts/footer.html');

    // 2. Determine Role from URL and Inject Correct Sidebar
    const path = window.location.pathname;
    let sidebarPath = '';

    if (path.includes('/student/')) {
        sidebarPath = '/layouts/sidebar-student.html';
    } else if (path.includes('/faculty/')) {
        sidebarPath = '/layouts/sidebar-faculty.html';
    } else if (path.includes('/admission/')) {
        sidebarPath = '/layouts/sidebar-admission.html';
    } else if (path.includes('/super-admin/')) {
        sidebarPath = '/layouts/sidebar-admin.html';
    }

    if (sidebarPath) {
        loadComponent('sidebar-placeholder', sidebarPath);
    }

    // 3. Centralized Frontend Route Guard
    checkSessionAndAccess(path);
});

function checkSessionAndAccess(path) {
    // Skip protection for public pages
    if (path.includes('/public/') || path === '/' || path === '/index.html') return;

    const user = JSON.parse(localStorage.getItem('user'));

    // Redirect to login if no session exists
    if (!user) {
        window.location.href = '/public/login.html';
        return;
    }

    // Role-Based Access Control (RBAC) validations
    if (path.includes('/student/') && user.role !== 'student') redirectToUnauthorized();
    if (path.includes('/faculty/') && user.role !== 'faculty') redirectToUnauthorized();
    if (path.includes('/admission/') && user.role !== 'admission') redirectToUnauthorized();
    if (path.includes('/super-admin/') && user.role !== 'admin') redirectToUnauthorized();
}

function redirectToUnauthorized() {
    window.location.href = '/public/unauthorized.html';
}
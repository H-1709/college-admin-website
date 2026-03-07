/* assets/js/auth/session.js */

(function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const path = window.location.pathname;

    // 1. Check if logged in
    if (!user || !user.isLoggedIn) {
        window.location.href = '/public/login.html';
        return;
    }

    // 2. Simple Role-Path Guard
    // Example: If path contains '/super-admin/' but role is 'student', block access.
    if (path.includes('/super-admin/') && user.role !== 'admin') {
        window.location.href = '/public/unauthorized.html';
    }
    
    if (path.includes('/faculty/') && user.role !== 'faculty') {
        window.location.href = '/public/unauthorized.html';
    }

    if (path.includes('/student/') && user.role !== 'student') {
        window.location.href = '/public/unauthorized.html';
    }
})();
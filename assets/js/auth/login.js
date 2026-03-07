/* assets/js/auth/login.js */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Get role from URL query params (e.g., login.html?role=student)
    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get('role') || 'student'; // default to student

    // 2. Update UI based on role
    const title = document.getElementById('loginTitle');
    title.innerText = `${role.charAt(0).toUpperCase() + role.slice(1)} Login`;

    // 3. Handle Form Submission
    const loginForm = document.getElementById('loginForm');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // --- MOCK BACKEND LOGIC ---
        // In a real app, you would fetch() to an API here.
        // For now, we accept any password longer than 3 chars.
        
        if(password.length > 3) {
            // Create a session object
            const sessionData = {
                email: email,
                role: role,
                token: 'mock-jwt-token-12345',
                isLoggedIn: true
            };

            // Save to LocalStorage
            localStorage.setItem('currentUser', JSON.stringify(sessionData));

            // Redirect based on role
            if(role === 'student') window.location.href = '../student/dashboard.html';
            else if(role === 'faculty') window.location.href = '../faculty/dashboard.html';
            else if(role === 'admission') window.location.href = '../admission/dashboard.html';
            else if(role === 'admin') window.location.href = '../super-admin/dashboard.html';
        
        } else {
            alert("Invalid credentials! (Try password length > 3)");
        }
    });
});
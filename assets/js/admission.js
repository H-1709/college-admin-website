/* assets/js/admission.js */

document.addEventListener('DOMContentLoaded', function() {
    const activities = [
        { name: "John Doe", action: "submitted a new application", time: "2 mins ago", icon: "bi-file-earmark-plus", color: "text-primary" },
        { name: "Sarah Smith", action: "inquired about MBA scholarship", time: "15 mins ago", icon: "bi-chat-dots", color: "text-info" },
        { name: "Mike Ross", action: "completed document verification", time: "1 hour ago", icon: "bi-patch-check", color: "text-success" },
        { name: "Rachel Zane", action: "scheduled an interview", time: "3 hours ago", icon: "bi-calendar-event", color: "text-warning" }
    ];

    const container = document.getElementById('admissionActivity');
    if (container) {
        activities.forEach(act => {
            container.innerHTML += `
                <div class="list-group-item p-3">
                    <div class="d-flex w-100 justify-content-between">
                        <h6 class="mb-1"><i class="bi ${act.icon} ${act.color} me-2"></i> ${act.name}</h6>
                        <small class="text-muted">${act.time}</small>
                    </div>
                    <p class="mb-1 small text-muted">${act.action}</p>
                </div>
            `;
        });
    }
});
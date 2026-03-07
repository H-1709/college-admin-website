/* assets/js/admin.js */

document.addEventListener('DOMContentLoaded', function() {
    const logs = [
        { time: "2026-02-12 10:15", user: "system_root", action: "SSL Certificate Renewal", status: "Success", color: "success" },
        { time: "2026-02-12 09:40", user: "admin_sarah", action: "Deleted User: #1290", status: "Warning", color: "warning" },
        { time: "2026-02-12 08:22", user: "db_sync", action: "Automatic DB Backup", status: "Success", color: "success" },
        { time: "2026-02-12 04:10", user: "firewall", action: "Blocked IP: 192.168.1.1", status: "Critical", color: "danger" }
    ];

    const tableBody = document.getElementById('auditLogsBody');
    if (tableBody) {
        logs.forEach(log => {
            tableBody.innerHTML += `
                <tr>
                    <td class="small text-muted">${log.time}</td>
                    <td><strong>${log.user}</strong></td>
                    <td>${log.action}</td>
                    <td><span class="badge bg-${log.color}">${log.status}</span></td>
                </tr>
            `;
        });
    }
});
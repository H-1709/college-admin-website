/* assets/js/student.js */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mock Data for Schedule
    const scheduleData = [
        { time: "09:00 AM", subject: "Data Structures", room: "Lab 3", status: "Present", statusClass: "badge bg-success" },
        { time: "11:00 AM", subject: "Web Development", room: "Room 204", status: "Upcoming", statusClass: "badge bg-primary" },
        { time: "02:00 PM", subject: "Database Systems", room: "Room 101", status: "Cancelled", statusClass: "badge bg-danger" }
    ];

    // 2. Mock Data for Deadlines
    const deadlineData = [
        { task: "Algorithm Project", due: "Tomorrow", priority: "High", color: "danger" },
        { task: "Database Schema", due: "3 Days", priority: "Medium", color: "warning" },
        { task: "Internship Form", due: "1 Week", priority: "Low", color: "info" }
    ];

    // 3. Populate Schedule Table
    const scheduleTable = document.getElementById('scheduleTableBody');
    if (scheduleTable) {
        scheduleData.forEach(item => {
            const row = `
                <tr>
                    <td>${item.time}</td>
                    <td><strong>${item.subject}</strong></td>
                    <td>${item.room}</td>
                    <td><span class="${item.statusClass}">${item.status}</span></td>
                </tr>
            `;
            scheduleTable.innerHTML += row;
        });
    }

    // 4. Populate Deadlines List
    const deadlineList = document.getElementById('deadlineList');
    if (deadlineList) {
        deadlineData.forEach(item => {
            const li = `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                        <h6 class="mb-0">${item.task}</h6>
                        <small class="text-muted">Due: ${item.due}</small>
                    </div>
                    <span class="badge bg-${item.color} rounded-pill">${item.priority}</span>
                </li>
            `;
            deadlineList.innerHTML += li;
        });
    }

    // 5. Update User Name from LocalStorage (if set)
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if(user && user.email) {
        const nameDisplay = document.getElementById('studentNameDisplay');
        if(nameDisplay) nameDisplay.innerText = user.email.split('@')[0];
    }
});
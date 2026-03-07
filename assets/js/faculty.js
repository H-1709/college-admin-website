/* assets/js/faculty.js */

document.addEventListener('DOMContentLoaded', function() {
    // 1. Mock Data for Lectures
    const lectures = [
        { time: "10:00 AM", course: "Advanced Java", batch: "CSE-A", room: "Lab 2", type: "Lecture" },
        { time: "12:30 PM", course: "Database Optimization", batch: "CSE-B", room: "Room 305", type: "Seminar" },
        { time: "03:00 PM", course: "Web Architecture", batch: "IT-C", room: "Virtual", type: "Online" }
    ];

    // 2. Mock Data for Grading
    const pendingGrades = [
        { assignment: "Mid-Term Quiz", course: "Java", count: 12, deadline: "Today" },
        { assignment: "Lab Report 4", course: "DBMS", count: 20, deadline: "24 Feb" }
    ];

    // 3. Populate Lectures
    const lectureContainer = document.getElementById('lectureTimeline');
    if (lectureContainer) {
        lectures.forEach(lec => {
            lectureContainer.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-start border-0 border-start border-4 border-primary mb-3 ms-2 shadow-sm bg-light">
                    <div class="ms-2 me-auto">
                        <div class="fw-bold text-primary">${lec.time} - ${lec.course}</div>
                        <small class="text-muted"><i class="bi bi-people"></i> ${lec.batch} | <i class="bi bi-geo-alt"></i> ${lec.room}</small>
                    </div>
                    <span class="badge bg-secondary rounded-pill">${lec.type}</span>
                </li>
            `;
        });
    }

    // 4. Populate Grading
    const gradingContainer = document.getElementById('gradingList');
    if (gradingContainer) {
        pendingGrades.forEach(item => {
            gradingContainer.innerHTML += `
                <div class="list-group-item p-3 border-0 border-bottom">
                    <div class="d-flex justify-content-between">
                        <h6 class="mb-1">${item.assignment}</h6>
                        <small class="text-danger">${item.deadline}</small>
                    </div>
                    <p class="mb-1 small text-muted">${item.course}</p>
                    <div class="progress mt-2" style="height: 5px;">
                        <div class="progress-bar bg-warning" style="width: 60%"></div>
                    </div>
                    <small class="text-muted">${item.count} students left</small>
                </div>
            `;
        });
    }
});
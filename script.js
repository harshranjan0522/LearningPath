// Placeholder for the learning paths with course details
const COURSES = {
    "beginner": [
        { name: "Intro to Python", details: "Learn the basics of Python programming." },
        { name: "Basic HTML", details: "Get started with HTML and web structure." },
        { name: "Intro to Algorithms", details: "Understand algorithm fundamentals." }
    ],
    "intermediate": [
        { name: "OOP with Python", details: "Master Object-Oriented Programming in Python." },
        { name: "Data Structures", details: "Explore common data structures and their usage." },
        { name: "Intermediate Web Development", details: "Build dynamic websites with JavaScript." }
    ],
    "advanced": [
        { name: "Machine Learning", details: "Dive into the basics of machine learning." },
        { name: "System Design", details: "Learn how to design scalable systems." },
        { name: "Advanced Algorithms", details: "Study complex algorithms and optimization techniques." }
    ]
};

// Function to get the learning path based on skill level
function getLearningPath(skillLevel) {
    return COURSES[skillLevel] || [];
}

// DOM Elements
const skillLevelSelect = document.getElementById('skill-level');
const getPathBtn = document.getElementById('get-path-btn');
const learningPathSection = document.getElementById('learning-path-section');
const learningPathList = document.getElementById('learning-path');
const optionsSection = document.getElementById('options-section');
const resultSection = document.getElementById('result-section');
const resultContent = document.getElementById('result-content');
const resetBtn = document.getElementById('reset-btn');

// Get completed courses from local storage
function getCompletedCourses() {
    return JSON.parse(localStorage.getItem('completedCourses')) || [];
}

// Save completed courses to local storage
function saveCompletedCourse(course) {
    const completed = getCompletedCourses();
    if (!completed.includes(course)) {
        completed.push(course);
        localStorage.setItem('completedCourses', JSON.stringify(completed));
    }
}

// Check if a course is completed
function isCourseCompleted(course) {
    const completed = getCompletedCourses();
    return completed.includes(course);
}

// Event listener for "Get Learning Path" button
getPathBtn.addEventListener('click', () => {
    const skillLevel = skillLevelSelect.value;

    if (skillLevel) {
        const path = getLearningPath(skillLevel);

        // Clear the previous path and results (if any)
        learningPathList.innerHTML = "";
        resultContent.innerHTML = "";
        resultSection.classList.add('hidden');

        // Display the learning path
        path.forEach(course => {
            const li = document.createElement('li');
            li.textContent = course.name;
            li.setAttribute('data-details', course.details); // Add details as tooltip
            li.classList.add(isCourseCompleted(course.name) ? 'completed' : 'incomplete');
            learningPathList.appendChild(li);
        });

        learningPathSection.classList.remove('hidden');
        optionsSection.classList.remove('hidden');
    } else {
        alert("Please select a skill level before proceeding.");
    }
});

// Event listener for "Mark as Completed" button
document.getElementById('mark-completed-btn').addEventListener('click', () => {
    const courseName = prompt("Enter the course name to mark as completed:");

    const courses = [...learningPathList.querySelectorAll('li')].map(li => li.textContent);

    if (courses.includes(courseName)) {
        saveCompletedCourse(courseName);
        alert(`${courseName} marked as completed.`);

        // Update the displayed learning path
        const li = [...learningPathList.querySelectorAll('li')].find(li => li.textContent === courseName);
        li.classList.remove('incomplete');
        li.classList.add('completed');
    } else {
        alert("Course not found in your learning path.");
    }
});

// Event listener for "View Progress" button
document.getElementById('view-progress-btn').addEventListener('click', () => {
    const completedCourses = getCompletedCourses();
    if (completedCourses.length > 0) {
        resultContent.innerHTML = "<h3>Completed Courses:</h3><ul>" +
            completedCourses.map(course => `<li>${course}</li>`).join('') +
            "</ul>";
    } else {
        resultContent.innerHTML = "<p>No courses completed yet.</p>";
    }
    resultSection.classList.remove('hidden');
});

// Event listener for "Generate Report" button
document.getElementById('generate-report-btn').addEventListener('click', () => {
    const skillLevel = skillLevelSelect.value;
    const path = getLearningPath(skillLevel);
    const completedCourses = getCompletedCourses();

    let reportContent = `<h3>Learning Path Report for ${skillLevel}:</h3><ul>`;
    path.forEach(course => {
        const status = completedCourses.includes(course.name) ? "✔ Completed" : "✘ Not completed";
        reportContent += `<li>${course.name}: ${status}</li>`;
    });
    reportContent += "</ul>";

    resultContent.innerHTML = reportContent;
    resultSection.classList.remove('hidden');
});

// Event listener for "Reset Progress" button
resetBtn.addEventListener('click', () => {
    if (confirm("Are you sure you want to reset all progress and reports?")) {
        localStorage.removeItem('completedCourses');
        alert("All progress and reports have been reset.");
        learningPathList.innerHTML = "";
        resultContent.innerHTML = "";
    }
});

// Event listener for "Exit" button
document.getElementById('exit-btn').addEventListener('click', () => {
    alert("Thank you! Exiting...");
    learningPathSection.classList.add('hidden');
    optionsSection.classList.add('hidden');
    resultSection.classList.add('hidden');
});

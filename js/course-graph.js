// T4iel Lab - Interactive Course Connection Graph Module

document.addEventListener("DOMContentLoaded", () => {
    initCourseChart();
});

// Course connection graph builder
function initCourseChart() {
    const svg = document.getElementById("curriculum-network-graph");
    if (!svg) return;

    // Simple course list
    const courses = [
        {
            id: "CSE101",
            title: "Computer Programming",
            desc: "Learn the absolute basics of writing computer programs. We use Python to write simple code, use variables, and solve basic logic problems.",
            credits: 4,
            skills: "Python Basics, Writing Code, Logic Thinking",
            x: 150,
            y: 160,
            prereqs: []
        },
        {
            id: "MAT101",
            title: "Basic Mathematics",
            desc: "Learn basic math concepts used in computers, including simple algebra, math matrices, and logic equations.",
            credits: 4,
            skills: "Basic Algebra, Math Logic, Problem Solving",
            x: 150,
            y: 320,
            prereqs: []
        },
        {
            id: "CSE102",
            title: "Data and Code Systems",
            desc: "Learn how to organize data in computer memory, including simple lists, queues, and search methods.",
            credits: 4,
            skills: "Data Storage, Search Lists, Code Sorting",
            x: 400,
            y: 160,
            prereqs: ["CSE101"]
        },
        {
            id: "CSE201",
            title: "Advanced Programming",
            desc: "Write faster and more efficient computer programs. Learn how to solve complex puzzles and make code run quickly.",
            credits: 4,
            skills: "Fast Code, Algorithm Design, Code Speed",
            x: 650,
            y: 100,
            prereqs: ["CSE102"]
        },
        {
            id: "CSE202",
            title: "Introduction to Machine Learning",
            desc: "Learn how computers can make simple predictions from data. We study basic patterns and simple predictions.",
            credits: 4,
            skills: "Data Patterns, Simple Predictions, AI Basics",
            x: 650,
            y: 300,
            prereqs: ["CSE102", "MAT101"]
        },
        {
            id: "CSE301",
            title: "Introduction to AI",
            desc: "Learn how smart systems make decisions. We look at basic rules, puzzle-solving steps, and simple game strategies.",
            credits: 4,
            skills: "Decision Rules, Puzzle Solvers, Smart Choices",
            x: 880,
            y: 100,
            prereqs: ["CSE201"]
        },
        {
            id: "CSE401",
            title: "Smart Advising System (SIJMS)",
            desc: "Our lab's main tool. It connects all courses, shows your study paths, and helps you pick the right classes to graduate easily.",
            credits: 4,
            skills: "Graduation Planning, Course Matching, System Design",
            x: 940,
            y: 200,
            prereqs: ["CSE301", "CSE202"]
        }
    ];

    const connections = [];
    courses.forEach(target => {
        target.prereqs.forEach(sourceId => {
            connections.push({ source: sourceId, target: target.id });
        });
    });

    const panelTitle = document.getElementById("panel-course-title");
    const panelDesc = document.getElementById("panel-course-desc");
    const panelMeta = document.getElementById("panel-course-meta");
    const panelCredits = document.getElementById("panel-course-credits");
    const panelSkills = document.getElementById("panel-course-skills");

    svg.setAttribute("viewBox", "0 0 1100 480");

    // Draw arrowheads
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const marker = document.createElementNS("http://www.w3.org/2000/svg", "marker");
    marker.setAttribute("id", "arrowhead");
    marker.setAttribute("viewBox", "0 0 10 10");
    marker.setAttribute("refX", "22");
    marker.setAttribute("refY", "5");
    marker.setAttribute("markerWidth", "6");
    marker.setAttribute("markerHeight", "6");
    marker.setAttribute("orient", "auto-start-reverse");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 0 0 L 10 5 L 0 10 z");
    path.setAttribute("fill", "#CBD5E1");
    marker.appendChild(path);
    defs.appendChild(marker);
    svg.appendChild(defs);

    // Draw connection lines
    const lineElements = [];
    connections.forEach(conn => {
        const src = courses.find(c => c.id === conn.source);
        const dest = courses.find(c => c.id === conn.target);

        if (src && dest) {
            const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
            line.setAttribute("x1", src.x);
            line.setAttribute("y1", src.y);
            line.setAttribute("x2", dest.x);
            line.setAttribute("y2", dest.y);
            line.setAttribute("class", "edge-line");
            line.setAttribute("marker-end", "url(#arrowhead)");

            svg.appendChild(line);
            lineElements.push({ element: line, source: conn.source, target: conn.target });
        }
    });

    // Draw nodes
    const nodeGroups = {};
    courses.forEach(course => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("class", "node-group");
        group.style.cursor = "pointer";

        const aura = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        aura.setAttribute("cx", course.x);
        aura.setAttribute("cy", course.y);
        aura.setAttribute("r", 25);
        aura.setAttribute("fill", "transparent");
        group.appendChild(aura);

        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", course.x);
        circle.setAttribute("cy", course.y);
        circle.setAttribute("r", 15);
        circle.setAttribute("class", "node-circle");
        group.appendChild(circle);

        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", course.x);
        text.setAttribute("y", course.y + 35);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "node-label");
        text.textContent = course.id;
        group.appendChild(text);

        group.addEventListener("mouseenter", () => toggleHover(course, true));
        group.addEventListener("mouseleave", () => toggleHover(course, false));
        group.addEventListener("click", () => showDetails(course));

        svg.appendChild(group);
        nodeGroups[course.id] = group;
    });

    function toggleHover(course, isHovered) {
        if (isHovered) {
            const prereqs = course.prereqs;
            const dependents = courses.filter(c => c.prereqs.includes(course.id)).map(c => c.id);

            courses.forEach(c => {
                const group = nodeGroups[c.id];
                if (c.id === course.id) {
                    group.classList.add("active");
                } else if (prereqs.includes(c.id)) {
                    const circ = group.querySelector(".node-circle");
                    circ.style.fill = "#8E3E3E";
                    circ.style.stroke = "#8E3E3E";
                } else if (dependents.includes(c.id)) {
                    const circ = group.querySelector(".node-circle");
                    circ.style.fill = "#F1F5F9";
                    circ.style.stroke = "#6B2E2E";
                } else {
                    group.style.opacity = "0.3";
                }
            });

            lineElements.forEach(line => {
                if (line.target === course.id) {
                    line.element.style.stroke = "#6B2E2E";
                    line.element.style.strokeWidth = "3px";
                } else if (line.source === course.id) {
                    line.element.style.stroke = "#8E3E3E";
                    line.element.style.strokeWidth = "3px";
                } else {
                    line.element.style.opacity = "0.1";
                }
            });

            showDetails(course);
        } else {
            courses.forEach(c => {
                const group = nodeGroups[c.id];
                group.classList.remove("active");
                group.style.opacity = "1";

                const circ = group.querySelector(".node-circle");
                circ.style.fill = "white";
                circ.style.stroke = "#6B2E2E";
            });

            lineElements.forEach(line => {
                line.element.style.stroke = "#E2E8F0";
                line.element.style.strokeWidth = "2px";
                line.element.style.opacity = "1";
            });
        }
    }

    function showDetails(course) {
        panelTitle.textContent = `${course.id}: ${course.title}`;
        panelDesc.textContent = course.desc;
        panelCredits.textContent = `${course.credits} Credits`;
        panelSkills.textContent = course.skills;
        panelMeta.style.setProperty("display", "flex", "important");

        if (course.prereqs.length > 0) {
            const reqLabel = document.createElement("div");
            reqLabel.className = "mt-2 small fw-bold text-maroon";
            reqLabel.innerHTML = `Needs Course: <span class="fw-normal text-muted">${course.prereqs.join(", ")}</span>`;
            panelDesc.appendChild(reqLabel);
        }
    }
}

// T4iel Lab - Members Data & Rendering Module

// =========================================================================
// LAB MEMBERS DICTIONARY (Edit/Add/Remove member details & links easily!)
// =========================================================================
const LAB_MEMBERS_DATA = [
    {
        category: "Principal Investigators",
        members: [
            {
                name: "Abhishek Chakraborty",
                designation: "Assistant Professor",
                affiliation: "School of Engineering and Applied Science",
                affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "abhishek.chakraborty@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/abhishek2003slg/"
            },
            {
                name: "Shashi Kant Shankar",
                designation: "Assistant Professor",
                affiliation: "School of Arts and Sciences",
                affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-arts-and-sciences/",
                email: "shashi.shankar@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/shashikantshankar"
            }
        ]
    },
    {
        category: "Current Members",
        members: [

            {
                name: "Vrunda Patel",
                designation: "Student Researcher (B.Tech CSE)",
                affiliation: "School of Engineering and Applied Science",
                affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "vrunda12005@gmail.com",
                linkedin: "https://www.linkedin.com/in/vrundapatel120/"
            },
            {
                name: "Lakshita Rathod",
                designation: "Student Researcher (M.Tech CSE & DS)",
                affiliation: "School of Engineering and Applied Science",
                affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "lakshita.rathod@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/lakshita-rathod-a60335280/"
            },
            {
                name: "Vishnuppriya Puvanenthira",
                designation: "Research Assistant",
                // affiliation: "School of Engineering and Applied Science",
                // affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "vishnuppriya.puvanenthiira@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/p-vishnuppriya-puvanenthiira/"
            },
            {
                name: "Dev Jani",
                designation: "Research Assistant",
                // affiliation: "School of Engineering and Applied Science",
                // affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "dev.jani@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/dev/"
            },
        ]
    },
    {
        category: "Past Members",
        members: [
            {
                name: "Nirman Patel",
                designation: "Former Research Assistant",
                // affiliation: "School of Engineering and Applied Science",
                // affiliationUrl: "https://ahduni.edu.in/academics/schools-centres/school-of-engineering-and-applied-science/",
                email: "nirman.patel@ahduni.edu.in",
                linkedin: "https://www.linkedin.com/in/nirman-patel-05bb6916b/"
            }
        ]
    }
];

document.addEventListener("DOMContentLoaded", () => {
    renderMembers();
});

// Render Lab Members dynamically from dictionary
function renderMembers() {
    const container = document.getElementById("members-container");
    if (!container) return;

    let html = "";

    LAB_MEMBERS_DATA.forEach(group => {
        html += `
        <div class="mb-5">
            <h3 class="h6 text-uppercase tracking-wider text-muted border-bottom pb-2 mb-4 fw-bold">
                ${group.category}
            </h3>
            <div class="row row-cols-1 row-cols-md-2 g-4">
        `;

        group.members.forEach(member => {
            const initials = getInitials(member.name);

            // School Affiliation HTML (with optional clickable link)
            let affiliationHtml = "";
            if (member.affiliation) {
                if (member.affiliationUrl) {
                    affiliationHtml = `<div class="small mt-1">
                        <a href="${member.affiliationUrl}" target="_blank" rel="noopener noreferrer" class="text-muted fst-italic text-decoration-none hover-maroon">
                            ${member.affiliation} &#8599;
                        </a>
                    </div>`;
                } else {
                    affiliationHtml = `<div class="small text-muted fst-italic mt-1">${member.affiliation}</div>`;
                }
            }

            // Build links row for Email and LinkedIn
            let linksHtml = "";
            if (member.email || member.linkedin) {
                linksHtml += `<div class="d-flex align-items-center gap-3 pt-3 border-top border-light mt-3">`;
                if (member.email) {
                    linksHtml += `
                        <a href="mailto:${member.email}" class="small text-muted text-decoration-none hover-maroon d-inline-flex align-items-center gap-1">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/></svg>
                            Email
                        </a>`;
                }
                if (member.email && member.linkedin) {
                    linksHtml += `<span class="text-muted small">•</span>`;
                }
                if (member.linkedin) {
                    linksHtml += `
                        <a href="${member.linkedin}" target="_blank" rel="noopener noreferrer" class="small text-primary text-decoration-none hover-maroon d-inline-flex align-items-center gap-1">
                            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/></svg>
                            LinkedIn
                        </a>`;
                }
                linksHtml += `</div>`;
            }

            html += `
                <div class="col">
                    <div class="card h-100 border-0 shadow-sm p-4 member-card">
                        <div class="d-flex align-items-center gap-3 mb-1">
                            <div class="member-avatar">${initials}</div>
                            <div>
                                <h4 class="h5 fw-bold mb-1 text-dark">${member.name}</h4>
                                <span class="badge bg-maroon-subtle text-maroon me-1 px-2 py-1 fs-7 fw-semibold">
                                    ${member.designation}
                                </span>
                                ${affiliationHtml}
                            </div>
                        </div>
                        ${linksHtml}
                    </div>
                </div>
            `;
        });

        html += `
            </div>
        </div>
        `;
    });

    container.innerHTML = html;
}

// Generate two-letter uppercase initials for avatar
function getInitials(name) {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

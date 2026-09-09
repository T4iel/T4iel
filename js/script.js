// T4iel Lab Portal - Shared Layout & Global Scripts

document.addEventListener("DOMContentLoaded", () => {
    // Inject Shared Navbar and Footer across all pages
    loadSharedLayout();
});

// Centralized Layout Loader (Navbar & Footer)
function loadSharedLayout() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    const footerPlaceholder = document.getElementById("footer-placeholder");

    // Reusable Navbar HTML
    if (navbarPlaceholder) {
        navbarPlaceholder.innerHTML = `
        <header class="bg-white border-bottom sticky-top shadow-sm">
            <nav class="navbar navbar-expand-lg navbar-light py-3">
                <div class="container d-flex justify-content-between align-items-center">
                    <a class="navbar-brand text-maroon fw-bold fs-3" href="index.html">
                        T4iel <span class="badge bg-maroon text-white fs-6">Lab</span>
                    </a>
                    <ul class="navbar-nav flex-row gap-4">
                        <li class="nav-item"><a href="index.html" class="nav-link-custom">Home</a></li>
                        <li class="nav-item"><a href="about.html" class="nav-link-custom">About</a></li>
                        <li class="nav-item"><a href="resources.html" class="nav-link-custom">Resources</a></li>
                        <li class="nav-item"><a href="members.html" class="nav-link-custom">Members</a></li>
                        <li class="nav-item"><a href="contact.html" class="nav-link-custom">Contact</a></li>
                        <li class="nav-item"><a href="careers.html" class="nav-link-custom">Careers</a></li>
                    </ul>
                </div>
            </nav>
        </header>
        `;
    }

    // Reusable Footer HTML
    if (footerPlaceholder) {
        footerPlaceholder.innerHTML = `
        <footer class="bg-dark text-white-50 text-center py-4 mt-5">
            <div class="container">
                <p class="mb-1">&copy; 2026 T4iel Lab | Ahmedabad University</p>
                <p class="small text-muted mb-0">Funded by Ahmedabad University Research Grants</p>
            </div>
        </footer>
        `;
    }

    // Auto-highlight Active Link
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-link-custom");
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

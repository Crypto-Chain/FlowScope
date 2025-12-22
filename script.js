// Simple mobile nav toggle + smooth scroll + dynamic year
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const toggle = document.getElementById("navToggle");
  const yearSpan = document.getElementById("year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (toggle && header) {
    toggle.addEventListener("click", () => {
      header.classList.toggle("nav-open");
    });
  }

  // Close mobile nav when clicking a link
  document.querySelectorAll(".nav-link, .footer-links a, .hero-actions a").forEach((link) => {
    link.addEventListener("click", () => {
      header.classList.remove("nav-open");
    });
  });
});

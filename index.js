// -----------------------------
// THEME TOGGLE (Dark / Light)
// -----------------------------
const themeToggle = document.getElementById("theme-toggle");
const pageWrap = document.getElementById("page-wrap");

// Default theme: Dark
let isDark = true;

themeToggle.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    document.body.style.backgroundColor = "#0d0d0d";
    document.body.style.color = "#e5e5e5";
    pageWrap.style.background =
      "radial-gradient(circle at 20% 30%, #1e1b4b, #0f172a 70%)";
    themeToggle.textContent = "Dark";
  } else {
    document.body.style.backgroundColor = "#f5f5f5";
    document.body.style.color = "#222";
    pageWrap.style.background =
      "radial-gradient(circle at 20% 30%, #e0e0ff, #f0f0f0 70%)";
    themeToggle.textContent = "Light";
  }
});

// -----------------------------
// SMOOTH SCROLL ON NAV LINKS
// -----------------------------
document.querySelectorAll(".nav-right a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
});

// -----------------------------
// SCROLL ANIMATION (fade-in)
// -----------------------------
const revealOnScroll = () => {
  const reveals = document.querySelectorAll(".card, .contact-section");

  reveals.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const triggerPoint = window.innerHeight - 100;

    if (sectionTop < triggerPoint) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    } else {
      section.style.opacity = "0";
      section.style.transform = "translateY(40px)";
      section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
    }
  });
};

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// -----------------------------
// BUTTON GLOW HOVER EFFECT
// -----------------------------
const buttons = document.querySelectorAll(".btn.primary");

buttons.forEach((btn) => {
  btn.addEventListener("mousemove", (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.setProperty("--x", `${x}px`);
    btn.style.setProperty("--y", `${y}px`);
  });
});

// -----------------------------
// HIRE ME BUTTON AUTO-SCROLL
// -----------------------------
const hireButton = document.querySelector(".btn.hire");

if (hireButton) {
  hireButton.addEventListener("click", (e) => {
    e.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 60,
        behavior: "smooth",
      });
    }
  });
}

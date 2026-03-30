const sections = document.querySelectorAll(".section-fade");
const navLinks = document.querySelectorAll(".site-nav a");

// Reveal content as it enters the viewport for a polished but restrained feel.
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("section-visible");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -60px 0px",
  }
);

sections.forEach((section) => observer.observe(section));

// Keep the navigation aligned with the section currently in view.
const setActiveLink = () => {
  let currentId = "";

  document.querySelectorAll("main section[id]").forEach((section) => {
    const top = section.getBoundingClientRect().top;
    if (top <= 140) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const isMatch = link.getAttribute("href") === `#${currentId}`;
    link.classList.toggle("is-active", isMatch);
  });
};

window.addEventListener("scroll", setActiveLink, { passive: true });
window.addEventListener("load", setActiveLink);

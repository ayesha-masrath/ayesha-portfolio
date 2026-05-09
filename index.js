const sections = document.querySelectorAll(".section-fade");
const navLinks = document.querySelectorAll(".site-nav a");
const proofSection = document.querySelector("#proof");
const statNumbers = document.querySelectorAll(".stat-card strong");

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

const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

const formatCount = (element, value) => {
  const target = Number(element.dataset.target || 0);
  const format = element.dataset.format || "integer";
  const decimals = Number(element.dataset.decimals || 0);
  const suffix = element.dataset.suffix || "";
  const prefix = element.dataset.prefix || "";

  if (format === "decimal") {
    return `${prefix}${value.toFixed(decimals)}${suffix}`;
  }

  const roundedValue = Math.round(value);
  const shouldUseGrouping = target >= 1000;

  return `${prefix}${shouldUseGrouping ? roundedValue.toLocaleString() : roundedValue}${suffix}`;
};

const animateStat = (element, duration = 1400) => {
  const target = Number(element.dataset.target || 0);
  const startTime = performance.now();

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);
    const currentValue = target * easedProgress;

    element.textContent = formatCount(element, currentValue);

    if (progress < 1) {
      requestAnimationFrame(update);
      return;
    }

    element.textContent = formatCount(element, target);
  };

  requestAnimationFrame(update);
};

if (proofSection) {
  const statsObserver = new IntersectionObserver(
    (entries, observerRef) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        statNumbers.forEach((stat) => animateStat(stat));
        observerRef.disconnect();
      });
    },
    {
      threshold: 0.3,
    }
  );

  statsObserver.observe(proofSection);
}

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

// Get DOM elements
const container = document.querySelector(".container");
const scrollContainer = document.querySelector(".scroll-container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");

const totalSections = sections.length;
let currentSection = 0;
let isScrolling = false;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);

    moveToSection(targetIndex);
  });
});

// Handle scroll events
container.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    if (!isScrolling) {
      isScrolling = true;

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        currentSection++;
      } else if (e.deltaY < 0 && currentSection > 0) {
        currentSection--;
      }

      moveToSection(currentSection);

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  },
  { passive: false }
);

// Move to specific section
function moveToSection(index) {
  currentSection = index;
  const moveX = currentSection * window.innerWidth;
  scrollContainer.style.transform = `translate3d(${-moveX}px, 0, 0)`;
  updateActiveSection(currentSection);
}

// Update active section in navigation
function updateActiveSection(index) {
  document.querySelectorAll(".nav-links a").forEach((link, i) => {
    if (i === index) {
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "var(--text-color)";
    }
  });
}

// Handle window resize
window.addEventListener("resize", () => {
  moveToSection(currentSection);
});

// Add animation to skill items
const skillItems = document.querySelectorAll(".skill-category li");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateX(0)";
      }
    });
  },
  { threshold: 0.5 }
);

skillItems.forEach((item) => {
  item.style.opacity = 0;
  item.style.transform = "translateX(-20px)";
  item.style.transition = "all 0.3s ease-in-out";
  observer.observe(item);
});

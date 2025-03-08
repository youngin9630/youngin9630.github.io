// Get DOM elements
const container = document.querySelector(".container");
const scrollContainer = document.querySelector(".scroll-container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");

let currentSection = 0;
const totalSections = sections.length;

// Handle scroll events
let isScrolling = false;
let startY;
let scrollProgress = 0;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);

    currentSection = targetIndex;
    updateScroll();
  });
});

// Handle wheel events for horizontal scrolling
window.addEventListener(
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

      updateScroll();

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  },
  { passive: false }
);

// Handle touch events for mobile
window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchmove", (e) => {
  if (!startY) return;

  const currentY = e.touches[0].clientY;
  const diff = startY - currentY;

  if (Math.abs(diff) > 50) {
    // Threshold for touch movement
    if (diff > 0 && currentSection < totalSections - 1) {
      currentSection++;
    } else if (diff < 0 && currentSection > 0) {
      currentSection--;
    }
    startY = null;
    updateScroll();
  }
});

// Update scroll position and navigation
function updateScroll() {
  const targetScroll = currentSection * window.innerWidth;
  scrollContainer.style.transform = `translate3d(${-targetScroll}px, 0, 0)`;

  // Update navigation highlight
  document.querySelectorAll(".nav-links a").forEach((link, index) => {
    if (index === currentSection) {
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "var(--text-color)";
    }
  });
}

// Handle window resize
window.addEventListener("resize", () => {
  updateScroll();
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

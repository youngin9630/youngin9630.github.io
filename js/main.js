// Get DOM elements
const container = document.querySelector(".container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);

    container.scrollTo({
      left: targetIndex * window.innerWidth,
      behavior: "smooth",
    });
  });
});

// Horizontal scroll with vertical scroll input
let isScrolling = false;
let currentSection = 0;
const totalSections = sections.length;

container.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (!isScrolling) {
    isScrolling = true;

    if (e.deltaY > 0 && currentSection < totalSections - 1) {
      // Scroll right
      currentSection++;
    } else if (e.deltaY < 0 && currentSection > 0) {
      // Scroll left
      currentSection--;
    }

    container.scrollTo({
      left: currentSection * window.innerWidth,
      behavior: "smooth",
    });

    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }
});

// Update active section on scroll
container.addEventListener("scroll", () => {
  const scrollPosition = container.scrollLeft;
  currentSection = Math.round(scrollPosition / window.innerWidth);

  // Update navigation highlight
  document.querySelectorAll(".nav-links a").forEach((link, index) => {
    if (index === currentSection) {
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "var(--text-color)";
    }
  });
});

// Handle window resize
window.addEventListener("resize", () => {
  container.scrollTo({
    left: currentSection * window.innerWidth,
    behavior: "smooth",
  });
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

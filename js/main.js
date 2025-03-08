// Get DOM elements
const container = document.querySelector(".container");
const scrollContainer = document.querySelector(".scroll-container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");

const totalSections = sections.length;

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);

    // Scroll to the target section vertically
    const targetScroll = targetIndex * window.innerHeight;
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  });
});

// Track scroll position and update horizontal slide
let ticking = false;

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight,
        document.documentElement.clientHeight
      );
      const windowHeight = window.innerHeight;
      const scrollable = documentHeight - windowHeight;

      // Calculate the progress (0 to 1)
      const scrollProgress = Math.min(Math.max(scrollTop / scrollable, 0), 1);

      // Calculate horizontal movement
      const totalMove = (totalSections - 1) * window.innerWidth;
      const moveX = totalMove * scrollProgress;

      // Apply smooth transform
      scrollContainer.style.transform = `translate3d(${-moveX}px, 0, 0)`;

      // Update active section
      const currentSection = Math.floor(scrollProgress * (totalSections - 1));
      updateActiveSection(currentSection);

      ticking = false;
    });

    ticking = true;
  }
});

// Update active section in navigation
function updateActiveSection(currentSection) {
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
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = Math.max(
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );
  const windowHeight = window.innerHeight;
  const scrollable = documentHeight - windowHeight;
  const scrollProgress = Math.min(Math.max(scrollTop / scrollable, 0), 1);

  const totalMove = (totalSections - 1) * window.innerWidth;
  const moveX = totalMove * scrollProgress;

  scrollContainer.style.transform = `translate3d(${-moveX}px, 0, 0)`;
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

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

// Update horizontal scroll based on vertical scroll position
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percentScrolled = scrolled / maxScroll;

  // Calculate the target horizontal scroll position
  const totalHorizontalScroll = (totalSections - 1) * window.innerWidth;
  const targetHorizontalScroll = percentScrolled * totalHorizontalScroll;

  // Apply the transform with easing
  scrollContainer.style.transform = `translate3d(${-targetHorizontalScroll}px, 0, 0)`;

  // Update navigation highlight
  const currentSection = Math.round(percentScrolled * (totalSections - 1));
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
  const scrolled = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const percentScrolled = scrolled / maxScroll;

  const totalHorizontalScroll = (totalSections - 1) * window.innerWidth;
  const targetHorizontalScroll = percentScrolled * totalHorizontalScroll;

  scrollContainer.style.transform = `translate3d(${-targetHorizontalScroll}px, 0, 0)`;
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

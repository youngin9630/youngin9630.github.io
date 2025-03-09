// Get DOM elements
const container = document.querySelector(".container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");

let isScrolling = false;
let currentSection = 0;
let scrollAmount = 0;
const scrollThreshold = 100; // 섹션 전환을 위한 스크롤 임계값
const totalSections = sections.length;

// 섹션 전환 함수
function goToSection(index) {
  currentSection = index;
  container.scrollTo({
    left: currentSection * window.innerWidth,
    behavior: "smooth",
  });
  updateNavigation();
}

// 네비게이션 상태 업데이트
function updateNavigation() {
  document.querySelectorAll(".nav-links a").forEach((link, index) => {
    if (index === currentSection) {
      link.style.color = "var(--primary-color)";
    } else {
      link.style.color = "var(--text-color)";
    }
  });
}

// 스크롤 이벤트 처리
container.addEventListener("wheel", (e) => {
  e.preventDefault();

  if (!isScrolling) {
    scrollAmount += e.deltaY;

    // 스크롤 양이 임계값을 넘으면 섹션 전환
    if (Math.abs(scrollAmount) >= scrollThreshold) {
      isScrolling = true;

      if (scrollAmount > 0 && currentSection < totalSections - 1) {
        // 아래로 스크롤
        goToSection(currentSection + 1);
      } else if (scrollAmount < 0 && currentSection > 0) {
        // 위로 스크롤
        goToSection(currentSection - 1);
      }

      // 스크롤 양 초기화
      scrollAmount = 0;

      // 스크롤 잠금 해제
      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }
});

// 네비게이션 링크 클릭 이벤트
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);
    goToSection(targetIndex);
  });
});

// 창 크기 변경 시 현재 섹션 유지
window.addEventListener("resize", () => {
  goToSection(currentSection);
});

// 터치 이벤트 처리
let touchStartX = 0;
let touchEndX = 0;

container.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

container.addEventListener("touchmove", (e) => {
  e.preventDefault();
});

container.addEventListener("touchend", (e) => {
  if (!isScrolling) {
    touchEndX = e.changedTouches[0].clientX;
    const touchDiff = touchStartX - touchEndX;

    if (Math.abs(touchDiff) >= 50) {
      // 터치 임계값
      isScrolling = true;

      if (touchDiff > 0 && currentSection < totalSections - 1) {
        // 왼쪽으로 스와이프
        goToSection(currentSection + 1);
      } else if (touchDiff < 0 && currentSection > 0) {
        // 오른쪽으로 스와이프
        goToSection(currentSection - 1);
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }
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

// Get DOM elements
const container = document.querySelector(".container");
const sections = document.querySelectorAll(".panel");
const navbar = document.querySelector(".navbar");
const mountainBack = document.querySelector(".mountain-back");
const mountainMid = document.querySelector(".mountain-mid");
const forestFront = document.querySelector(".forest-front");
const runningCharacter = document.querySelector(".running-character");

let isScrolling = false;
let currentScroll = 0;

// maxScroll을 함수로 변경하여 항상 최신 값을 반환하도록 수정
function getMaxScroll() {
  return (sections.length - 1) * window.innerWidth;
}

const parallaxSpeed = {
  back: 0.1, // 가장 느리게
  mid: 0.3, // 중간 속도
  front: 1, // 가장 빠르게
};

// 초기 위치 설정
runningCharacter.style.left = `${window.innerWidth / 2}px`;
runningCharacter.style.transform = "translateX(-50%)";

// 스크롤 위치에 따른 배경 이동
function updateParallax(scrollPosition) {
  const backX = -scrollPosition * parallaxSpeed.back;
  const midX = -scrollPosition * parallaxSpeed.mid;
  const frontX = -scrollPosition * parallaxSpeed.front;

  mountainBack.style.transform = `translateX(${backX}px) translateZ(-10px) scale(2)`;
  mountainMid.style.transform = `translateX(${midX}px) translateZ(-5px) scale(1.5)`;
  forestFront.style.transform = `translateX(${frontX}px) translateZ(-2px) scale(1.2)`;

  const characterX = window.innerWidth / 2 + currentScroll;

  runningCharacter.style.left = `${characterX}px`;
  runningCharacter.style.transform = "translateX(-50%)";
}

// 네비게이션 상태 업데이트
function updateNavigation() {
  const currentSection = Math.round(currentScroll / window.innerWidth);
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

  // 현재 스크롤 위치 계산 (maxScroll 함수 사용)
  currentScroll = Math.max(
    0,
    Math.min(currentScroll + e.deltaY, getMaxScroll())
  );

  // 컨테이너 스크롤
  container.scrollTo({
    left: currentScroll,
    behavior: "smooth",
  });

  // 패럴랙스 효과 업데이트
  updateParallax(currentScroll);
  updateNavigation();
});

// 네비게이션 링크 클릭 이벤트도 수정
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    const targetIndex = Array.from(sections).indexOf(targetSection);

    currentScroll = Math.min(targetIndex * window.innerWidth, getMaxScroll());
    container.scrollTo({
      left: currentScroll,
      behavior: "smooth",
    });

    updateParallax(currentScroll);
    updateNavigation();
  });
});

// 창 크기 변경 시 현재 위치 유지도 수정
window.addEventListener("resize", () => {
  const currentSection = Math.round(currentScroll / window.innerWidth);
  currentScroll = Math.min(currentSection * window.innerWidth, getMaxScroll());

  container.scrollTo({
    left: currentScroll,
    behavior: "smooth",
  });

  // 스크롤이 0일 때는 화면 중앙에 위치
  if (currentScroll === 0) {
    runningCharacter.style.left = `${window.innerWidth / 2}px`;
    runningCharacter.style.transform = "translateX(-50%)";
  } else {
    updateParallax(currentScroll);
  }
});

// 터치 이벤트 처리도 수정
let touchStartX = 0;
let touchMoveX = 0;

container.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
});

container.addEventListener("touchmove", (e) => {
  e.preventDefault();
  touchMoveX = e.touches[0].clientX;
  const diff = touchStartX - touchMoveX;

  currentScroll = Math.max(0, Math.min(currentScroll + diff, getMaxScroll()));

  container.scrollTo({
    left: currentScroll,
    behavior: "smooth",
  });

  updateParallax(currentScroll);
  updateNavigation();

  touchStartX = touchMoveX;
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

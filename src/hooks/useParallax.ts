"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface ParallaxConfig {
  back: number;
  mid: number;
  front: number;
}

const parallaxSpeed: ParallaxConfig = {
  back: 0.1, // 가장 느리게
  mid: 0.3, // 중간 속도
  front: 1, // 가장 빠르게
};

export const useParallax = (sectionsLength: number) => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getMaxScroll = useCallback(() => {
    if (typeof window === "undefined") return 0;
    return (sectionsLength - 1) * window.innerWidth;
  }, [sectionsLength]);

  const updateParallax = useCallback((scrollPosition: number) => {
    const backX = -scrollPosition * parallaxSpeed.back;
    const midX = -scrollPosition * parallaxSpeed.mid;
    const frontX = -scrollPosition * parallaxSpeed.front;

    // DOM 요소들 업데이트
    const mountainBack = document.querySelector(
      ".mountain-back"
    ) as HTMLElement;
    const mountainMid = document.querySelector(".mountain-mid") as HTMLElement;
    const forestFront = document.querySelector(".forest-front") as HTMLElement;
    const runningCharacter = document.querySelector(
      ".running-character"
    ) as HTMLElement;

    if (mountainBack) {
      mountainBack.style.transform = `translateX(${backX}px) translateZ(-10px) scale(2)`;
    }
    if (mountainMid) {
      mountainMid.style.transform = `translateX(${midX}px) translateZ(-5px) scale(1.5)`;
    }
    if (forestFront) {
      forestFront.style.transform = `translateX(${frontX}px) translateZ(-2px) scale(1.2)`;
    }
    if (runningCharacter) {
      const characterX = window.innerWidth / 2 + scrollPosition;
      runningCharacter.style.left = `${characterX}px`;
      runningCharacter.style.transform = "translateX(-50%)";
    }
  }, []);

  const updateNavigation = useCallback(() => {
    const currentSection = Math.round(currentScroll / window.innerWidth);
    document.querySelectorAll(".nav-links a").forEach((link, index) => {
      const linkElement = link as HTMLElement;
      if (index === currentSection) {
        linkElement.style.color = "var(--primary-color)";
      } else {
        linkElement.style.color = "var(--text-color)";
      }
    });
  }, [currentScroll]);

  const scrollToSection = useCallback(
    (sectionIndex: number) => {
      const newScroll = Math.min(
        sectionIndex * window.innerWidth,
        getMaxScroll()
      );
      setCurrentScroll(newScroll);

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }

      updateParallax(newScroll);
      updateNavigation();
    },
    [getMaxScroll, updateParallax, updateNavigation]
  );

  const handleWheel = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();

      const newScroll = Math.max(
        0,
        Math.min(currentScroll + e.deltaY, getMaxScroll())
      );

      setCurrentScroll(newScroll);

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }

      updateParallax(newScroll);
      updateNavigation();
    },
    [currentScroll, getMaxScroll, updateParallax, updateNavigation]
  );

  const handleTouchStart = useCallback((e: TouchEvent) => {
    setIsScrolling(true);
  }, []);

  const handleTouchMove = useCallback((_e: TouchEvent) => {
    _e.preventDefault();
    // 터치 로직은 별도로 구현
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    // 초기 위치 설정
    const runningCharacter = document.querySelector(
      ".running-character"
    ) as HTMLElement;
    if (runningCharacter) {
      runningCharacter.style.left = `${window.innerWidth / 2}px`;
      runningCharacter.style.transform = "translateX(-50%)";
    }

    // 이벤트 리스너 추가
    container.addEventListener("wheel", handleWheel);
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentScroll, handleWheel, handleTouchStart, handleTouchMove]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      const currentSection = Math.round(currentScroll / window.innerWidth);
      const newScroll = Math.min(
        currentSection * window.innerWidth,
        getMaxScroll()
      );
      setCurrentScroll(newScroll);

      if (containerRef.current) {
        containerRef.current.scrollTo({
          left: newScroll,
          behavior: "smooth",
        });
      }

      if (newScroll === 0) {
        const runningCharacter = document.querySelector(
          ".running-character"
        ) as HTMLElement;
        if (runningCharacter) {
          runningCharacter.style.left = `${window.innerWidth / 2}px`;
          runningCharacter.style.transform = "translateX(-50%)";
        }
      } else {
        updateParallax(newScroll);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentScroll, getMaxScroll, updateParallax]);

  return {
    currentScroll,
    isScrolling,
    containerRef,
    scrollToSection,
    updateParallax,
    updateNavigation,
  };
};

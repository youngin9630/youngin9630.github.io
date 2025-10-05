"use client";

import React from "react";

interface HeroProps {
  onContactClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onContactClick }) => {
  return (
    <section id="home" className="hero panel">
      <div className="text-center">
        <h1 className="text-5xl mb-4 leading-tight">
          안녕하세요,
          <br />
          프론트엔드 개발자입니다
        </h1>
        <p className="text-xl mb-8 text-gray-600">
          창의적이고 사용자 중심적인 웹 경험을 만듭니다
        </p>
        <button
          className="inline-block px-8 py-4 bg-primary text-white no-underline rounded-lg font-semibold text-base cursor-pointer transition-colors duration-300 hover:bg-secondary"
          onClick={onContactClick}
        >
          Contact Me
        </button>
      </div>
    </section>
  );
};

export default Hero;


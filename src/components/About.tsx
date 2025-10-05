"use client";

import React from "react";

const About: React.FC = () => {
  return (
    <section id="about" className="about panel">
      <h2>About Me</h2>
      <div className="max-w-4xl mx-auto text-center">
        <div className="about-text">
          <p className="text-lg text-gray-600">
            프론트엔드 개발에 대한 열정과 창의성을 가지고 있습니다. 사용자
            경험을 최우선으로 생각하며, 최신 웹 기술을 활용하여 혁신적인
            솔루션을 제공합니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;


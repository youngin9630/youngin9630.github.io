"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ParallaxBackground from "@/components/ParallaxBackground";
import { useParallax } from "@/hooks/useParallax";

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const sections = [Hero, About, Skills, Projects, Contact];
  const { containerRef, scrollToSection } = useParallax(sections.length);

  const handleNavigate = (sectionIndex: number) => {
    setCurrentSection(sectionIndex);
    scrollToSection(sectionIndex);
  };

  const handleContactClick = () => {
    const contactIndex = sections.length - 1;
    setCurrentSection(contactIndex);
    scrollToSection(contactIndex);
  };

  return (
    <div className="App">
      <Navigation onNavigate={handleNavigate} currentSection={currentSection} />

      <div className="container" ref={containerRef}>
        <ParallaxBackground />
        <div className="running-character"></div>

        <div className="scroll-container">
          <Hero onContactClick={handleContactClick} />
          <About />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </div>

      <footer>
        <p>&copy; 2024 Your Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

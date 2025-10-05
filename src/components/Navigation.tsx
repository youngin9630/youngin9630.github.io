"use client";

import React from "react";

interface NavigationProps {
  onNavigate: (sectionIndex: number) => void;
  currentSection: number;
}

const Navigation: React.FC<NavigationProps> = ({
  onNavigate,
  currentSection,
}) => {
  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (index: number) => {
    onNavigate(index);
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-[1000]">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-primary">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick(0);
            }}
            className="no-underline"
          >
            Portfolio
          </a>
        </div>
        <ul className="flex gap-8 list-none">
          {navItems.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(index);
                }}
                className={`no-underline font-medium transition-colors duration-300 hover:text-primary ${
                  currentSection === index ? "text-primary" : "text-gray-700"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;


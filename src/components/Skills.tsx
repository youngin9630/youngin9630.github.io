"use client";

import React, { useEffect, useRef } from "react";

const Skills: React.FC = () => {
  const skillItemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.style.opacity = "1";
            target.style.transform = "translateX(0)";
          }
        });
      },
      { threshold: 0.5 }
    );

    skillItemsRef.current.forEach((item) => {
      if (item) {
        item.style.opacity = "0";
        item.style.transform = "translateX(-20px)";
        item.style.transition = "all 0.3s ease-in-out";
        observer.observe(item);
      }
    });

    return () => observer.disconnect();
  }, []);

  const frontendSkills = [
    "HTML5",
    "CSS3",
    "JavaScript",
    "React.js",
    "TypeScript",
  ];
  const toolsSkills = ["Git", "Webpack", "Responsive Design", "UI/UX Design"];

  return (
    <section id="skills" className="skills panel">
      <h2>Skills</h2>
      <div className="flex justify-center gap-16 flex-wrap max-w-6xl mx-auto">
        <div className="flex-1 min-w-[250px]">
          <h3 className="mb-4 text-primary">Frontend</h3>
          <ul className="list-none">
            {frontendSkills.map((skill, index) => (
              <li
                key={skill}
                ref={(el) => { skillItemsRef.current[index] = el; }}
                className="mb-2 p-2 bg-light rounded"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex-1 min-w-[250px]">
          <h3 className="mb-4 text-primary">Tools & Others</h3>
          <ul className="list-none">
            {toolsSkills.map((skill, index) => (
              <li
                key={skill}
                ref={(el) => {
                  skillItemsRef.current[frontendSkills.length + index] = el;
                }}
                className="mb-2 p-2 bg-light rounded"
              >
                {skill}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;


"use client";

import React from "react";

interface Project {
  title: string;
  description: string;
  liveDemo?: string;
  github?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: "프로젝트 제목",
      description: "프로젝트 설명을 입력하세요.",
      liveDemo: "#",
      github: "#",
    },
  ];

  return (
    <section id="projects" className="projects panel">
      <h2>Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="mb-4 text-primary">{project.title}</h3>
            <p className="mb-4">{project.description}</p>
            <div className="flex gap-4 mt-4">
              {project.liveDemo && (
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium no-underline"
                >
                  Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-medium no-underline"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;


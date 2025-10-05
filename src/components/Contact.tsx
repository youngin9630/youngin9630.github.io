"use client";

import React from "react";

const Contact: React.FC = () => {
  return (
    <section id="contact" className="contact panel">
      <h2>Contact Me</h2>
      <div className="max-w-2xl mx-auto text-center">
        <div className="contact-info">
          <p className="mb-4 text-lg">
            <i className="fas fa-envelope mr-2 text-primary"></i>{" "}
            your.email@example.com
          </p>
          <p className="mb-4 text-lg">
            <i className="fab fa-github mr-2 text-primary"></i> GitHub
          </p>
          <p className="mb-4 text-lg">
            <i className="fab fa-linkedin mr-2 text-primary"></i> LinkedIn
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;


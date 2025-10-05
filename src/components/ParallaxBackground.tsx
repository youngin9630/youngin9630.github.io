"use client";

import React from "react";
import Image from "next/image";

const ParallaxBackground: React.FC = () => {
  return (
    <div className="parallax-bg">
      <div className="mountain-back">
        <Image
          src="/images/mountain-back.png"
          alt="Mountain background"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
      <div className="mountain-mid">
        <Image
          src="/images/mountain-mid.png"
          alt="Mountain middle"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
      <div className="forest-front">
        <Image
          src="/images/forest-front.png"
          alt="Forest front"
          fill
          className="object-cover object-bottom"
          priority
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;


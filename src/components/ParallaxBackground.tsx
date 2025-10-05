"use client";

import React from "react";
import Image from "next/image";

const ParallaxBackground: React.FC = () => {
  return (
    <div className="parallax-bg">
      <div className="mountain-back">
        <Image
          src="/mountain-back.png"
          alt="Mountain background"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom", width: "100%", height: "100%" }}
          priority
        />
      </div>
      <div className="mountain-mid">
        <Image
          src="/mountain-mid.png"
          alt="Mountain middle"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom", width: "100%", height: "100%" }}
          priority
        />
      </div>
      <div className="forest-front">
        <Image
          src="/forest-front.png"
          alt="Forest front"
          fill
          style={{ objectFit: "cover", objectPosition: "bottom", width: "100%", height: "100%" }}
          priority
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;

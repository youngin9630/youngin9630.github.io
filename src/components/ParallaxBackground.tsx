"use client";

import React from "react";
import Image from "next/image";
import mountainBack from "../../public/mountain-back.png";
import mountainMid from "../../public/mountain-mid.png";
import forestFront from "../../public/forest-front.png";

const ParallaxBackground: React.FC = () => {
  return (
    <div className="parallax-bg">
      <div className="mountain-back">
        <Image
          src={mountainBack}
          alt="Mountain background"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom",
            width: "100%",
            height: "100%",
          }}
          priority
        />
      </div>
      <div className="mountain-mid">
        <Image
          src={mountainMid}
          alt="Mountain middle"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom",
            width: "100%",
            height: "100%",
          }}
          priority
        />
      </div>
      <div className="forest-front">
        <Image
          src={forestFront}
          alt="Forest front"
          fill
          style={{
            objectFit: "contain",
            objectPosition: "bottom",
            width: "100%",
            height: "100%",
          }}
          priority
        />
      </div>
    </div>
  );
};

export default ParallaxBackground;

"use client";

import React from "react";
import Image from "next/image";

const RunningCharacter: React.FC = () => {
  return (
    <div className="running-character">
      <Image
        src="/images/character-run.gif"
        alt="Running character"
        width={32}
        height={64}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default RunningCharacter;

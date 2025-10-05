"use client";

import React from "react";
import Image from "next/image";
import characterRun from "../../public/character-run.gif";

const RunningCharacter: React.FC = () => {
  return (
    <div className="running-character">
        <Image
          src={characterRun}
          alt="Running character"
          width={32}
          height={64}
          style={{ objectFit: 'contain' }}
          priority
        />
    </div>
  );
};

export default RunningCharacter;

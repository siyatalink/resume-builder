"use client";

import React from 'react';
import Lottie from "lottie-react";
import animationData from '../public/animations/resume.json'; // Adjust the path as needed

const LottieAnimation: React.FC = () => {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        className="mx-auto "
        style={{ width: 400, height: 400  }} // Adjust size as needed
      />
    </div>
  );
};

export default LottieAnimation;
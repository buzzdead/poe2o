"use client";

import { useEffect, useState } from "react";
import SkillTreeMain from "./SkillTreeMain";

const SkillTree = () => {
  const [isMobileOrPad, setIsMobileOrPad] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileOrPad(window.innerWidth < 1000); // Check if width is less than 1000px
    };

    // Initial check
    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={isMobileOrPad ? "w-[110rem] h-[110rem]" : ""}>
      <SkillTreeMain />
    </div>
  );
};

export default SkillTree;

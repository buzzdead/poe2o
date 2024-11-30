"use client";
import { SkillTreeImage } from "./skilltreeimage";
import { SkillTreeNodeParent } from "./SkillTreeNodeParent";

const SkillTreeMain = () => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SkillTreeImage />
      <SkillTreeNodeParent />
    </div>
  );
};

export default SkillTreeMain;

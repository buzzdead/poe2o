"use client";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { SkillTreeNodeParent } from "./SkillTreeNodeParent";

const SkillTreeMain = () => {
  return (
    
    <div className="relative w-full h-full overflow-hidden">
       <SaveLoadSetups />
      <SkillTreeImage />
      <SkillTreeNodeParent />
    </div>
  );
};

export default SkillTreeMain;

"use client";
import { useRef } from "react";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { SkillTreeNodeParent } from "./SkillTreeNodeParent";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";

const SkillTreeMain = () => {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  console.log(zoomRef)
  return (
    <div className="relative w-full h-full overflow-hidden">
      <SaveLoadSetups />
      <TransformWrapper
      ref={zoomRef}
        initialScale={1}
        limitToBounds={true}
        wheel={{
          step: 0.5,
          wheelDisabled: false, // Enable zoom on scroll by default
          activationKeys: ['Shift'], // Enable zoom only when Shift is held down
        }}
        panning={{ disabled: false }}
      >
        <TransformComponent>
          <SkillTreeImage />
          <SkillTreeNodeParent zoomRef={zoomRef} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SkillTreeMain;

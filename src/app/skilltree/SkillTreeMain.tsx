"use client";
import { useRef, useState, useEffect } from "react";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef, getMatrixTransformStyles } from "react-zoom-pan-pinch";
import { SearchInput } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import { NodeSize, SkillTreeNodes } from "./SkillTreeNodes";
import CircleMenu from "./circlemenu";
import { useNodeSearch } from "./useNodeSearch";
import { SkillNode } from "../context/CharContext";
import { AscNodes } from "./AscNodes";
interface Props {
  isMobileOrPad: boolean
}
const SkillTreeMain = ({isMobileOrPad}: Props) => {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ top: number, left: number } | null>(null);

 
  const nodeGroups: Record<NodeSize, SkillNode[]> = {
    small: nodes.smalls,
    notable: nodes.notables,
    keystone: nodes.keystones,
  };
  const handleTargetClick = () => {
    if(zoomRef?.current?.instance?.transformState?.scale)
   zoomRef.current.zoomOut(5)
  if(!isOpen && (zoomRef?.current?.instance?.transformState?.scale || 1) > 1.1)
    setTimeout(() => setIsOpen(true), 500)
  else
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const targetElement = document.getElementById("target-div");

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect();
      const divWidth = rect.width;
      const divHeight = rect.height;

      // Fine-tuning the position by adding a slight offset to adjust the circle menu positioning
      setTargetPosition({
        top: rect.top + window.scrollY - divHeight / 2 - 125,  // Adjust top with a small offset
        left: rect.left + window.scrollX - divWidth / 2 + -50, // Adjust left with a small offset
      });
    }
  }, [isOpen]); // Recalculate position when `isOpen` changes

  return (
    <div className="relative w-full h-full overflow-hidden will-change-auto">
      <SaveLoadSetups />
      <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      
      {/* The target div, when clicked will open the circle menu */}
     

      {/* Pass the target position to CircleMenu */}
      {targetPosition && <CircleMenu setIsOpen={handleTargetClick} isOpen={isOpen} position={targetPosition} />}

      <TransformWrapper
        ref={zoomRef}
        customTransform={(scale, positionX, positionY) =>
          getMatrixTransformStyles(scale, positionX, positionY)
        }
        initialScale={isMobileOrPad ? 0.8 : 1} // Adjust the scale for mobile
        minScale={isMobileOrPad ? 0.5 : 1} // Allow smaller zoom-out for mobile
        maxScale={isMobileOrPad ? 2 : 5} // Limit zoom-in for mobile
        limitToBounds={!isMobileOrPad}
        doubleClick={{ disabled: isMobileOrPad }} // Disable double-click zoom on mobile
        wheel={{ step: isMobileOrPad ? 0.3 : 0.5, wheelDisabled: isMobileOrPad, activationKeys: ['Shift'] }} // Adjust step or disable wheel zoom
        panning={{ disabled: false, wheelPanning: !isMobileOrPad }} // Enable smooth panning
        velocityAnimation={{
          disabled: isMobileOrPad, // Disable momentum for better touch control
        }}
      >
        <TransformComponent contentStyle={{ willChange: "transform" }}>
          <SkillTreeImage setIsOpen={handleTargetClick} />
         
            <SkillTreeNodes
              searchQuery={searchQuery}
              filterNodes={filterNodes}
              nodes={nodeGroups}
              zoomRef={zoomRef}
            />
          <AscNodes searchQuery={searchQuery} filterNodes={filterNodes} zoomRef={zoomRef} />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SkillTreeMain;

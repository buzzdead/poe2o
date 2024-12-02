"use client";
import { useRef, useState, useEffect } from "react";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import { SkillTreeNodes } from "./SkillTreeNodes";
import CircleMenu from "./circlemenu";

const SkillTreeMain = () => {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();
  const [isOpen, setIsOpen] = useState(false);
  const [targetPosition, setTargetPosition] = useState<{ top: number, left: number } | null>(null);

  const nodeGroups = [
    { size: "15.5px", nodes: nodes.keystones },
    { size: "10.5px", nodes: nodes.notables },
    { size: "8px", nodes: nodes.smalls },
  ];

  const handleTargetClick = () => {
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
        top: rect.top + window.scrollY - divHeight / 2 - 175,  // Adjust top with a small offset
        left: rect.left + window.scrollX - divWidth / 2 + -50, // Adjust left with a small offset
      });
    }
  }, [isOpen]); // Recalculate position when `isOpen` changes

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SaveLoadSetups />
      <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
      
      {/* The target div, when clicked will open the circle menu */}
     

      {/* Pass the target position to CircleMenu */}
      {targetPosition && <CircleMenu isOpen={isOpen} position={targetPosition} />}

      <TransformWrapper
        ref={zoomRef}
        initialScale={1}
        limitToBounds={true}
        wheel={{
          step: 0.5,
          wheelDisabled: false,
          activationKeys: ['Shift'],
        }}
        panning={{ disabled: false }}
      >
        <TransformComponent>
          <SkillTreeImage setIsOpen={handleTargetClick} />
          {nodeGroups.map(({ size, nodes }, index) => (
            <SkillTreeNodes
              key={index}
              size={size}
              searchQuery={searchQuery}
              filterNodes={filterNodes}
              nodes={nodes}
              zoomRef={zoomRef}
            />
          ))}
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SkillTreeMain;

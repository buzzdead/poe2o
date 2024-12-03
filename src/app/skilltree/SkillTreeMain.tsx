"use client";
import { useRef, useState, useEffect } from "react";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef, getMatrixTransformStyles } from "react-zoom-pan-pinch";
import { SearchInput } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import newNodes from "../data/file1_updated.json";
import { SkillTreeNodes } from "./SkillTreeNodes";
import CircleMenu from "./circlemenu";
import { useCharacterContext } from "../context/CharContext";
import { useNodeSearch } from "./useNodeSearch";

const SkillTreeMain = () => {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();
  const [isOpen, setIsOpen] = useState(false);
  const { characters } = useCharacterContext()
  const [targetPosition, setTargetPosition] = useState<{ top: number, left: number } | null>(null);

  const nodeGroups = [
    { size: "15.5px", nodes: nodes.keystones },
    { size: "10.5px", nodes: nodes.notables },
    { size: "8px", nodes: nodes.smalls },
  ];

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
        initialScale={1}
        limitToBounds={true}
        wheel={{
          step: 0.5,
          wheelDisabled: false,
          activationKeys: ['Shift'],
        }}
        panning={{ disabled: false, wheelPanning: false}}
        velocityAnimation={{
          disabled: false, // Smooth momentum
          sensitivity: 0.5, // Adjust sensitivity
          animationTime: 0.8 // Animation duration
        }}
       
      >
        <TransformComponent contentStyle={{willChange: "transform"}}>
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
          <SkillTreeNodes size="16px" searchQuery={searchQuery} filterNodes={filterNodes} nodes={newNodes?.asc?.filter(an => an.class === characters[0]?.ascendancies?.name?.toLowerCase())} zoomRef={zoomRef}/>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default SkillTreeMain;

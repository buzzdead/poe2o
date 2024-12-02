"use client";
import { useRef } from "react";
import SaveLoadSetups from "../context/Setup";
import { SkillTreeImage } from "./skilltreeimage";
import { TransformWrapper, TransformComponent, ReactZoomPanPinchRef } from "react-zoom-pan-pinch";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import { SkillTreeNodes } from "./SkillTreeNodes";

const SkillTreeMain = () => {
  const zoomRef = useRef<ReactZoomPanPinchRef>(null);
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();
  const nodeGroups = [
    { size: "15.5px", nodes: nodes.keystones },
    { size: "10.5px", nodes: nodes.notables },
    { size: "8px", nodes: nodes.smalls },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden">
      <SaveLoadSetups />
      <SearchInput
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
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

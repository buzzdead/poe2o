"use client";
import { toast } from "sonner";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import { SearchInput, useNodeSearch } from "../NodeHighlighter";
import { useEffect, useRef, useState } from "react";
import nodes from "../data/merged_nodes.json";
import { SkillTreeNodes } from "./SkillTreeNodes";
import filterNodesData from "../data/combined_filtered_nodes.json"; // Load the filtered nodes

export const SkillTreeNodeParent = () => {
  const isLeftShiftSelected = useRef(false)
  const { nodes: myNodes, selectNode } = useCharacterContext();
  const { handleSearchChange, searchQuery, filterNodes } = useNodeSearch();
  const [tooltip, setTooltip] = useState<any>(null); // For showing node details
  const handleSelectNode = (node: SkillNode) => {
    const isSelected = myNodes.find((sn) => sn.id === node.id);
    if (isSelected) {
      isLeftShiftSelected.current ? selectNode(myNodes.filter((sn) => sn.name !== node.name)) : selectNode(myNodes.filter((sn) => sn.id !== node.id));
    } else {
      const nodes2 = filterNodesData.nodes.filter((sn) => sn.name === node.name)

      isLeftShiftSelected.current && nodes2.length > 0 ? selectNode([...myNodes, ...nodes2]) : selectNode([...myNodes, node]);
    }

    toast(node.name + (isSelected ? " Removed" : " Selected"), {});
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Shift" && !e.repeat) {
        isLeftShiftSelected.current = true;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Shift") {
        isLeftShiftSelected.current = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  const showToolTip = () => {
    const node = tooltip.node;
    const { isRightSide, cursorXPercent } = tooltip;
    const isStanceBreaker = node?.name === "Stance Breaker";

    const leftOffset = isRightSide
      ? `${Math.min(cursorXPercent * 100 - 10, 95)}%` // Adjust left but keep within bounds
      : `${Math.max(cursorXPercent * 100 + 10, 5)}%`; // Adjust right but keep within bounds

    return (
      <div
        className="absolute bg-black/95 backdrop-blur-sm text-white p-4 rounded-lg flex flex-col z-50 pointer-events-none shadow-xl"
        style={{
          left: leftOffset,
          top: `${node.y * 100 - (isStanceBreaker ? 5 : 0)}%`,
          transform: "translate(-50%, -50%)",
          maxWidth: "18rem", // Default width for desktops
          boxShadow: `
                0 0 0 1px rgba(16, 185, 129, 0.2),
                0 0 0 2px rgba(16, 185, 129, 0.3),
                0 0 0 4px rgba(16, 185, 129, 0.1),
                0 0 20px 4px rgba(16, 185, 129, 0.1)
              `,
        }}
      >
        <h3 className="text-xl font-semibold text-center mb-3 text-emerald-200">
          {node?.name || "Unknown Node"}
        </h3>
        <ul className="list-disc pl-5 space-y-2.5">
          {tooltip.nodeDesc?.map((stat: string, index: number) => (
            <li
              key={index}
              className="text-sm text-emerald-100 leading-relaxed"
            >
              {stat}
            </li>
          ))}
        </ul>
        <style jsx>{`
          @media (max-width: 640px) {
            div {
              max-width: 14rem; /* Smaller tooltip on mobile */
              padding: 0.75rem; /* Reduce padding */
              font-size: 0.875rem; /* Smaller font size */
            }
          }
        `}</style>
      </div>
    );
  };
  const nodeGroups = [
    { size: "15px", nodes: nodes.keystones },
    { size: "7.5px", nodes: nodes.notables },
    { size: "5px", nodes: nodes.smalls },
  ];
  return (
  <>
  <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
    {nodeGroups.map(({ size, nodes }, index) => (
      <SkillTreeNodes
        key={index}
        size={size}
        searchQuery={searchQuery}
        setTooltip={setTooltip}
        filterNodes={filterNodes}
        nodes={nodes}
        myNodes={myNodes}
        handleSelectNode={handleSelectNode}
      />
    ))}
    {tooltip && showToolTip()}
  </>
);
};

"use client";
import { toast } from "sonner";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
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
    
    // Define a distance threshold (adjust as needed)
    const distanceThreshold = 10; // Example threshold, you can change this
  
    // Helper function to calculate distance to the center (0.5, 0.5)
    const calculateDistanceToCenter = (node: SkillNode) => {
      // We use the center (0.5, 0.5) as the reference point
      const centerX = 0.5;
      const centerY = 0.5;
      const distance = Math.sqrt(
        Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
      );
      return distance;
    };
  
    if (isSelected) {
      // If the node is already selected, we deselect it (and potentially deselect others if Shift is held)
      if (isLeftShiftSelected.current) {
        // Deselect all nodes with the same name
        selectNode(myNodes.filter((sn) => sn.name !== node.name));
      } else {
        // Deselect the single node
        selectNode(myNodes.filter((sn) => sn.id !== node.id));
      }
      toast(node.name + " Removed", {});
    } else {
      if (isLeftShiftSelected.current) {
        // If Shift is held down, find nodes with the same name and within the distance threshold
        let nearbyNodes = filterNodesData.nodes.filter((sn) => {
          // Check for nodes with the same name
          return sn.name === node.name && calculateDistance(node, sn) <= distanceThreshold;
        });
  
        // If the node is "Attribute", further filter the nearby nodes to prioritize those closer to the center
        if (node.name === "Attribute") {
          nearbyNodes = nearbyNodes.filter((sn) => calculateDistanceToCenter(sn) <= calculateDistanceToCenter(node));
        }
  
        if (nearbyNodes.length > 0) {
          selectNode([...myNodes, ...nearbyNodes]); // Add nearby nodes to the selection
          toast(node.name + " and nearby nodes Selected", {});
        }
      } else {
        // If Shift is not held, select the single node
        selectNode([...myNodes, node]);
        toast(node.name + " Selected", {});
      }
    }
  };
  
  

  const calculateDistance = (node1: { x: number, y: number }, node2: { x: number, y: number }): number => {
    // Scale the x and y coordinates by 100
    const x1 = node1.x * 100;
    const y1 = node1.y * 100;
    const x2 = node2.x * 100;
    const y2 = node2.y * 100;
  
    // Calculate the Euclidean distance between the two nodes
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  
    return distance;
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

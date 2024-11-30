"use client";
import { useState } from "react";
import Image from "next/image";
import nodes from "./data/merged_nodes2.json";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
import { toast } from "sonner";
import { useCharacterContext } from "./context/CharContext";

type Node = typeof nodes.keystones[number] | typeof nodes.notables[number] | typeof nodes.small[number]

const SkillTreeMain = () => {
  const [tooltip, setTooltip] = useState<any>(null); // For showing node details
  const { nodes: myNodes, selectNode } = useCharacterContext()
  const handleSelectNode = (node: Node) => {
    const isSelected = (myNodes.find(sn => sn.name === node.name))
      isSelected ? selectNode(myNodes.filter(sn => sn.name !== node.name))
      :
    selectNode([...myNodes, node])
    toast(node.name + (isSelected ? " Removed" : " Selected"), {
    
    });
  }
  // Tooltip close
  const closeTooltip = () => setTooltip(null);
  const { handleSearchChange, searchQuery, filterNodes } = useNodeSearch()
 

  const IMAGE_WIDTH = 2750; // Python script's processed image width
  const IMAGE_HEIGHT = 2864; // Python script's processed image height

  // Function to show the tooltip
  const showToolTip = () => {
    const node = tooltip.node;
    const { isRightSide, cursorXPercent } = tooltip;
  
    const leftOffset = isRightSide 
      ? `${Math.min(cursorXPercent * 100 - 10, 95)}%` // Adjust left but keep within bounds
      : `${Math.max(cursorXPercent * 100 + 10, 5)}%`; // Adjust right but keep within bounds
  
    return (
      <div
        className="absolute bg-black/95 backdrop-blur-sm text-white p-4 rounded-lg w-72 flex flex-col z-50 pointer-events-none shadow-xl"
        style={{
          left: leftOffset,
          top: `${node.y * 100}%`,
          transform: "translate(-50%, -50%)",
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
      </div>
    );
  };
  
  
  
  
  

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Background Image */}
      <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
      <Image
        src="/skill-tree2.png" // Ensure this is the same file used in Python
        alt="Skill Tree"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="relative z-1" // Background with lower z-index
      />

      {/* Nodes Overlay */}
      {nodes.keystones.map((node) => {
         const isSelected = myNodes.find(n => n.name === node.name);
  const nodeStyle = node.stats.length > 0
    ? {
        highLight: filterNodes.includes(node.name) || searchQuery.trim() !== "" && node.stats.some(stat => stat.toLowerCase().includes(searchQuery.toLowerCase())),
        border:  isSelected ? '2px solid red' : filterNodes.includes(node.name) || searchQuery.trim() !== "" && node.stats.some(stat => stat.toLowerCase().includes(searchQuery.toLowerCase())) ? "2px solid rgba(220, 163, 74, 0.75)" : '2px solid rgba(22, 163, 74, 0.75)', // green-600
        background: 'rgba(22, 163, 74, 0.15)',
        boxShadow: `
          0 0 0 1px rgba(22, 163, 74, 0.2),
          0 0 10px 2px rgba(22, 163, 74, 0.3),
          inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
        `,
      }
    : {
        border:  isSelected ? '2px solid red' : '2px solid rgba(37, 99, 235, 0.25)', // blue-600
        background: 'transparent',
      };

  return (
    <div
      key={node.id}
      onClick={() => handleSelectNode(node)}
      className={`absolute cursor-pointer rounded-full transition-all duration-2000 hover:scale-125 ${nodeStyle.highLight ? "animate-pulseBorderShadow" : ""}`}
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        transform: "translate(-50%, -50%)",
        width: "15px",
        height: "15px",
        ...nodeStyle
      }}
      onMouseEnter={(event) => {
        const isRightSide = event.clientX > window.innerWidth / 2;
        const cursorXPercent = event.clientX / window.innerWidth;
        setTooltip({ 
          node: node, 
          nodeDesc: node.stats, 
          isRightSide, 
          cursorXPercent 
        });
      }}
      onMouseLeave={closeTooltip}
    />
  );
})}
      {nodes.notables.map((node) => {
         const isSelected = myNodes.find(n => n.name === node.name);
        const nodeStyle = node.stats.length > 0
        ? {
          highLight: filterNodes.includes(node.name) || searchQuery.trim() !== "" && node.stats.some(stat => stat.toLowerCase().includes(searchQuery.toLowerCase())),
            border:  isSelected ? '2px solid red' :  filterNodes.includes(node.name) || searchQuery.trim() !== "" && node.stats.some(stat => stat.toLowerCase().includes(searchQuery.toLowerCase())) ? "2px solid rgba(220, 163, 74, 0.75)" : '2px solid rgba(22, 163, 74, 0.75)', // green-600
            background: 'rgba(22, 163, 74, 0.15)',
            boxShadow: `
              0 0 0 1px rgba(22, 163, 74, 0.2),
              0 0 10px 2px rgba(22, 163, 74, 0.3),
              inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
            `,
          }
        : {
            border:  isSelected ? '2px solid red' : '2px solid rgba(37, 99, 235, 0.25)', // blue-600
            background: 'transparent',
          };
          
        return (
          <div
            key={node.id}
            className={`absolute cursor-pointer rounded-full transition-all duration-2000 hover:scale-125  ${nodeStyle.highLight ? "animate-pulseBorderShadow" : ""}`}
            style={{
              left: `${node.x * 100}%`,
              top: `${node.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "7.5px",
              height: "7.5px",
              ...nodeStyle
            }}
            onMouseEnter={(event) => {
              const isRightSide = event.clientX > window.innerWidth / 2;
              const cursorXPercent = event.clientX / window.innerWidth;
              setTooltip({ 
                node: node, 
                nodeDesc: node.stats, 
                isRightSide, 
                cursorXPercent 
              });
            }}
            onMouseLeave={closeTooltip}
          ><div
          className="absolute inset-0" // This ensures it covers the entire parent div
          onClick={() => handleSelectNode(node)}
          style={{
            backgroundColor: "transparent", // No background, just for expanding the area
            pointerEvents: "auto", // Make sure it captures mouse events
            borderRadius: "50%", // Keep it rounded
            padding: '8px',
          }}
        />
        </div>
        );
      })}

{nodes.small.map((node) => {
  // Check if the node is selected
  const isSelected = myNodes.find(n => n.name === node.name);

  // Define node style based on whether it's selected or not
  const nodeStyle = node.stats.length > 0
    ? {
        // If node is selected, set border and shadow to red
        border: isSelected ? '2px solid rgba(220, 38, 38, 0.75)' : '2px solid rgba(22, 163, 74, 0.75)', // red-600 or green-600
        background: 'rgba(22, 163, 74, 0.15)', // green background when there are stats
        boxShadow: isSelected
          ? '0 0 0 1px rgba(220, 38, 38, 0.75), 0 0 10px 2px rgba(220, 38, 38, 0.75)' // red shadow when selected
          : '0 0 0 1px rgba(22, 163, 74, 0.2), 0 0 10px 2px rgba(22, 163, 74, 0.3)', // green shadow for non-selected nodes
      }
    : {
        border: isSelected ? '2px solid red' : '2px solid rgba(37, 99, 235, 0.25)', // blue-600 for no stats
        background: 'transparent',
      };

  return (
    <div
    onClick={() => handleSelectNode(node)}
      key={node.id}
      className={`absolute cursor-pointer rounded-full transition-all duration-200 hover:scale-125`}
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: '5px',
        height: '5px',
        ...nodeStyle, // Apply the dynamic styles based on selected state
      }}
      onMouseEnter={(event) => {
        const isRightSide = event.clientX > window.innerWidth / 2;
        const cursorXPercent = event.clientX / window.innerWidth;
        setTooltip({
          node: node,
          nodeDesc: node.stats,
          isRightSide,
          cursorXPercent,
        });
      }}
      onMouseLeave={closeTooltip}
    >
      {/* Inner div to increase the clickable area */}
      <div
        
        className="absolute inset-0"
        style={{
          backgroundColor: 'transparent',
          pointerEvents: 'auto', // Ensure it captures mouse events
          borderRadius: '50%', // Keep it rounded
          padding: '6px', // Increase clickable area
        }}
      />
    </div>
  );
})}


      {/* Tooltip (Positioned outside of nodes) */}
      {tooltip && showToolTip()}
    </div>
  );
};

export default SkillTreeMain;

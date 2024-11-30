"use client";
import { useState } from "react";
import Image from "next/image";
import nodes from "./data/merged_nodes2.json";

const SkillTreeMain = () => {
  const [tooltip, setTooltip] = useState<any>(null); // For showing node details

  // Tooltip close
  const closeTooltip = () => setTooltip(null);

  const IMAGE_WIDTH = 2750; // Python script's processed image width
  const IMAGE_HEIGHT = 2864; // Python script's processed image height

  // Function to show the tooltip
  const showToolTip = () => {
    const node = tooltip.node;
    return (
      <div
        className="absolute bg-black/95 backdrop-blur-sm text-white p-4 rounded-lg w-72 flex flex-col z-50 pointer-events-none shadow-xl"
        style={{
          left: `${node.x * 87.5}%`,
          top: `${node.y * 90}%`,
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
      <Image
        src="/skill-tree2.png" // Ensure this is the same file used in Python
        alt="Skill Tree"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="relative z-1" // Background with lower z-index
      />

      {/* Nodes Overlay */}
      {nodes.keystones.map((node) => {
  const nodeStyle = node.stats.length > 0
    ? {
        border: '2px solid rgba(22, 163, 74, 0.75)', // green-600
        background: 'rgba(22, 163, 74, 0.15)',
        boxShadow: `
          0 0 0 1px rgba(22, 163, 74, 0.2),
          0 0 10px 2px rgba(22, 163, 74, 0.3),
          inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
        `,
      }
    : {
        border: '2px solid rgba(37, 99, 235, 0.25)', // blue-600
        background: 'transparent',
      };

  return (
    <div
      key={node.id}
      className="absolute cursor-pointer rounded-full transition-all duration-200 hover:scale-125"
      style={{
        left: `${node.x * 100}%`,
        top: `${node.y * 100}%`,
        transform: "translate(-50%, -50%)",
        width: "15px",
        height: "15px",
        ...nodeStyle
      }}
      onMouseEnter={() => setTooltip({ node: node, nodeDesc: node.stats })}
      onMouseLeave={closeTooltip}
    />
  );
})}
      {nodes.notables.map((node) => {
        const nodeStyle = node.stats.length > 0
        ? {
            border: '2px solid rgba(22, 163, 74, 0.75)', // green-600
            background: 'rgba(22, 163, 74, 0.15)',
            boxShadow: `
              0 0 0 1px rgba(22, 163, 74, 0.2),
              0 0 10px 2px rgba(22, 163, 74, 0.3),
              inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
            `,
          }
        : {
            border: '2px solid rgba(37, 99, 235, 0.25)', // blue-600
            background: 'transparent',
          };
        return (
          <div
            key={node.id}
            className={`absolute cursor-pointer rounded-full bg-transparent border-2`}
            style={{
              left: `${node.x * 100}%`,
              top: `${node.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "7.5px",
              height: "7.5px",
              ...nodeStyle
            }}
            onMouseEnter={() =>
              setTooltip({ node: node, nodeDesc: node.stats })
            }
            onMouseLeave={closeTooltip}
          />
        );
      })}

      {nodes.small.map((node) => {
         const nodeStyle = node.stats.length > 0
         ? {
             border: '2px solid rgba(22, 163, 74, 0.75)', // green-600
             background: 'rgba(22, 163, 74, 0.15)',
             boxShadow: `
               0 0 0 1px rgba(22, 163, 74, 0.2),
               0 0 10px 2px rgba(22, 163, 74, 0.3),
               inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
             `,
           }
         : {
             border: '2px solid rgba(37, 99, 235, 0.25)', // blue-600
             background: 'transparent',
           };
        return (
          <div
            key={node.id}
            className={`absolute cursor-pointer rounded-full bg-transparent border-2`}
            style={{
              left: `${node.x * 100}%`,
              top: `${node.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: "5px",
              height: "5px",
              ...nodeStyle
            }}
            onMouseEnter={() =>
              setTooltip({ node: node, nodeDesc: node.stats })
            }
            onMouseLeave={closeTooltip}
          />
        );
      })}

      {/* Tooltip (Positioned outside of nodes) */}
      {tooltip && showToolTip()}
    </div>
  );
};

export default SkillTreeMain;

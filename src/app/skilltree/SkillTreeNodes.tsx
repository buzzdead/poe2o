"use client";
import { SkillNode } from "../context/CharContext";

interface Props {
  nodes: SkillNode[];
  myNodes: SkillNode[];
  filterNodes: string[];
  searchQuery: string;
  handleSelectNode: (node: SkillNode) => void;
  setTooltip: (a: any) => void;
  size: string;
}

export const SkillTreeNodes = ({
  nodes,
  myNodes,
  filterNodes,
  searchQuery,
  handleSelectNode,
  setTooltip,
  size,
}: Props) => {
      
  return (
    <div>
      {nodes.map((node) => {
        const isSelected = myNodes.find((n) => n.name === node.name);
        const nodeStyle =
          node.stats.length > 0
            ? {
                highLight:
                  filterNodes.includes(node.name) ||
                  (searchQuery.trim() !== "" &&
                    node.stats.some((stat) =>
                      stat.toLowerCase().includes(searchQuery.toLowerCase())
                    )),
                border: isSelected
                  ? "2px solid red"
                  : filterNodes.includes(node.name) ||
                    (searchQuery.trim() !== "" &&
                      node.stats.some((stat) =>
                        stat.toLowerCase().includes(searchQuery.toLowerCase())
                      ))
                  ? "2px solid rgba(220, 163, 74, 0.75)"
                  : "2px solid rgba(22, 163, 74, 0.75)", // green-600
                background: "rgba(22, 163, 74, 0.15)",
                boxShadow: `
         0 0 0 1px rgba(22, 163, 74, 0.2),
         0 0 10px 2px rgba(22, 163, 74, 0.3),
         inset 0 0 4px 1px rgba(22, 163, 74, 0.3)
       `,
              }
            : {
                border: isSelected
                  ? "2px solid red"
                  : "2px solid rgba(37, 99, 235, 0.25)", // blue-600
                background: "transparent",
              };

        return (
          <div
            key={node.id}
            onClick={() => handleSelectNode(node)}
            className={`absolute cursor-pointer rounded-full transition-all duration-2000 hover:scale-125 ${
              nodeStyle.highLight ? "animate-pulseBorderShadow" : ""
            }`}
            style={{
              left: `${node.x * 100}%`,
              top: `${node.y * 100}%`,
              transform: "translate(-50%, -50%)",
              width: size,
              height: size,
              ...nodeStyle,
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
            onMouseLeave={() => setTooltip(null)}
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "transparent",
                pointerEvents: "auto", // Ensure it captures mouse events
                borderRadius: "50%", // Keep it rounded
                padding: size === "7.5px" ? "8px" : size === "5px" ? "6px" : "", // Increase clickable area
              }}
            />
          </div>
        );
      })}{" "}
    </div>
  );
};

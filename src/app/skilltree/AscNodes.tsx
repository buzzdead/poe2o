"use client";
import { useEffect, useRef, useState } from "react";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import { toast } from "sonner";
import filterNodesData from "../data/combined_filtered_nodes.json"; // Load the filtered nodes
import nodes from "../data/file1_updated.json";
import React from "react";

type ArcNode = SkillNode & {kind: string, class: string}
const ascNodeSizes: Record<string, string> = {small: '10px', notable: '16px', keystone: '16px'}

interface Props {
  filterNodes: string[];
  searchQuery: string;
  zoomRef: any;
}

export const AscNodes = React.memo(
  ({ filterNodes, searchQuery, zoomRef }: Props) => {
    const isCtrlDown = useRef(false);
    const [tooltip, setTooltip] = useState<any>(null); // For showing node details
    const isLeftShiftSelected = useRef(false);
    const { nodes: myNodes, selectNode, characters } = useCharacterContext();
    useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.ctrlKey) {
          isCtrlDown.current = true;
        }
      };

      const handleKeyUp = (event: KeyboardEvent) => {
        if (!event.ctrlKey) {
          isCtrlDown.current = false;
        }
      };

      // Add event listeners
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      // Cleanup event listeners
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }, []);

    const showToolTip = () => {
      const scale = zoomRef?.current?.instance?.transformState?.scale || 1;
      const node = tooltip.node;
      const { cursorXPercent, cursorYPercent } = tooltip;
      const isRightSide = cursorXPercent > 0.5;
      const isTopHalf = cursorYPercent < 0.5;
      const tooltipScale = Math.min(Math.max(1 / scale, 0.5), 1);
    
      // Left-right positioning: If it's on the right side, align the tooltip to the left, otherwise to the right
      const leftOffset = isRightSide
        ? `${Math.min(cursorXPercent * 100 - 9 + scale)}%`
        : `${Math.max(cursorXPercent * 100 + 9 - scale)}%`;
    
      // Top-bottom positioning: If it's on the top half, position it below the cursor, otherwise above
      const topOffset = isTopHalf
        ? `${Math.max(cursorYPercent * 100)}%`
        : `${Math.min(cursorYPercent * 100)}%`;
    
      return (
        <div
          className="absolute bg-gradient-to-tl from-gray-900 to-background text-white p-0 rounded-2xl w-72 flex flex-col pointer-events-none"
          style={{
            left: leftOffset,
            top: topOffset,
            zIndex: 99999,
            transform: `translate(-50%, -50%) scale(${tooltipScale})`,
            maxWidth: "18rem",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="bg-gradient-to-b from-red-600 to-background px-4 py-1 mt- rounded-3xl">
            <h3 className="text-xl text-center bg-gradient-to-r from-yellow-300 via-red-100 pb-1 to-yellow-700 bg-clip-text text-transparent">
              {node?.name || "Unknown Node"}
            </h3>
          </div>
          <div className="p-4 space-y-2 gap-2 flex flex-col">
            {node.stats?.map((stat: string[], index: number) => (
              <div key={index}>
                <span className="text-white text-md font-semibold text-md">{stat}</span>
              </div>
            ))}
          </div>
        </div>
      );
    };
   
    const calculateNodeStyle = (node: ArcNode, isSelected: boolean) => {
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
                    background: isSelected ? "red" : node.kind === "small" ? 'yellow' : node.kind === "notable" ? 'lightblue' : "rgba(204, 204, 255, .41)",
                }
              : {
                  border: isSelected
                    ? "2px solid red"
                    : "2px solid rgba(37, 99, 235, 0.15)", // blue-600
                  background: isSelected ? "red" : node.kind === "small" ? 'yellow' : node.kind === "notable" ? 'lightblue' : "rgba(204, 204, 255, .41)",
                };
              return nodeStyle
    };
    const handleSelectNode = (node: SkillNode) => {
      const isSelected = myNodes.find((sn) => sn.id === node.id);

      // Define a distance threshold (adjust as needed)
      const distanceThreshold = 10;

      const calculateDistanceToCenter = (node: SkillNode) => {
        const centerX = 0.5;
        const centerY = 0.5;
        return Math.sqrt(
          Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
        );
      };

      if (isSelected) {
        // Deselect logic
        if (isLeftShiftSelected.current) {
          selectNode(myNodes.filter((sn) => sn.name !== node.name));
        } else {
          selectNode(myNodes.filter((sn) => sn.id !== node.id));
        }
        toast(node.name + " Removed", {});
      } else {
        if (isLeftShiftSelected.current) {
          // Check for nearby nodes with the same name within distanceThreshold
          let nearbyNodes = filterNodesData.nodes.filter((sn) => {
            return (
              sn.name === node.name &&
              calculateDistance(node, sn) <= distanceThreshold
            );
          });

          // Further filter for "Attribute" nodes to prioritize those closer to the center
          if (node.name === "Attribute") {
            nearbyNodes = nearbyNodes.filter(
              (sn) =>
                calculateDistanceToCenter(sn) <= calculateDistanceToCenter(node)
            );
          }

          // Deduplicate nodes by ID before adding to myNodes
          const uniqueNodesToAdd = nearbyNodes.filter(
            (sn) => !myNodes.some((existingNode) => existingNode.id === sn.id)
          );

          if (uniqueNodesToAdd.length > 0) {
            selectNode([...myNodes, ...uniqueNodesToAdd]);
            toast(node.name + " and nearby nodes Selected", {});
          }
        } else {
          // Single node selection logic
          selectNode([...myNodes, node]);
          toast(node.name + " Selected", {});
        }
      }
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
    const calculateDistance = (
      node1: { x: number; y: number },
      node2: { x: number; y: number }
    ): number => {
      // Scale the x and y coordinates by 100
      const x1 = node1.x * 100;
      const y1 = node1.y * 100;
      const x2 = node2.x * 100;
      const y2 = node2.y * 100;

      // Calculate the Euclidean distance between the two nodes
      const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

      return distance;
    };
    return (
      <div>
          {tooltip && showToolTip()}
        {nodes?.asc?.filter(an => an.class === characters[0]?.ascendancies?.name?.toLowerCase())?.map((node) => {
          const isSelected = myNodes.some((n) => n.id === node.id);
          const nodeStyle = calculateNodeStyle(node, isSelected);
  
          return (
            <MemoizedAscNode
              key={node.id}
              node={node}
              nodeStyle={nodeStyle}
              size={ascNodeSizes[node.kind] ?? '12px'}
              handleSelectNode={handleSelectNode}
              isCtrlDown={isCtrlDown.current}
              setTooltip={setTooltip}
            />
          );
        })}
      </div>
    );
  }
);

const MemoizedAscNode = React.memo(
  ({ node, nodeStyle, size, handleSelectNode, setTooltip, isCtrlDown }: any) => {
    return (
      <div
          key={node.id}
          onClick={() => handleSelectNode(node)}
          className={`absolute cursor-pointer rounded-full will-change-auto transition-all duration-5000 ${
            nodeStyle.highLight
              ? "animate-pulseBorderShadow bg-yellow!important"
              : ""
          }`}
          style={{
            left: `${node.x * 100}%`,
            zIndex: 55,
            top: `${node.y * 100}%`,
            transform: "translate(-50%, -50%)",
            width: size,
            height: size,
            ...nodeStyle,
          }}
          onMouseEnter={(event) => {
            const imageContainer =
              document.getElementById("image-container"); // Adjust this to your image container's id
            const rect = imageContainer?.getBoundingClientRect();
            if (!rect) return;
            const cursorXPercent = (event.clientX - rect.left) / rect.width;
            const cursorYPercent = (event.clientY - rect.top) / rect.height;
            if (isCtrlDown) {
              handleSelectNode(node);
            } else
              setTooltip({
                node: node,
                nodeDesc: node.stats,
                cursorXPercent,
                cursorYPercent,
              });

            // Automatically select node if Ctrl is held down
          }}
          onMouseLeave={() => setTooltip(null)}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: "transparent",
              pointerEvents: "auto", // Ensure it captures mouse events
              borderRadius: "50%", // Keep it rounded
              padding:
                size === "10.5px" ? "8px" : size === "8px" ? "6px" : "", // Increase clickable area
            }}
          />
        </div>
    );
  }
);
MemoizedAscNode.displayName = "MemoizedAscNode"
AscNodes.displayName = "SkillTreeNodes";

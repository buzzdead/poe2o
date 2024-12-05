"use client";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import nodes from "../data/file1_updated.json";
import React from "react";
import { useTooltip } from "./useToolTip";
import { useKeyPress } from "./useKeyPress";
import { useNodeSelector } from "../context/nodeSelector";

type ArcNode = SkillNode & {kind: string, class: string}
const ascNodeSizes: Record<string, string> = {small: '10px', notable: '16px', keystone: '16px'}

interface Props {
  filterNodes: string[];
  searchQuery: string;
  zoomRef: any;
}

export const AscNodes = React.memo(
  ({ filterNodes, searchQuery, zoomRef }: Props) => {
    const { nodes: myNodes, characters } = useCharacterContext();
    const { handleSelectNode } = useNodeSelector()
    const { showToolTip, handleTooltipHide, handleTooltipShow } = useTooltip(zoomRef)
    const { isCtrlDown, isLeftShiftSelected } = useKeyPress()

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
   
    return (
      <div>
          {showToolTip()}
        {nodes?.asc?.filter(an => an.class === characters[0]?.ascendancies?.name?.toLowerCase())?.map((node) => {
          const isSelected = myNodes.some((n) => n.id === node.id);
          const nodeStyle = calculateNodeStyle(node, isSelected);
  
          return (
            <MemoizedAscNode
              key={node.id}
              node={node}
              nodeStyle={nodeStyle}
              size={ascNodeSizes[node.kind] ?? '12px'}
              handleSelectNode={() => handleSelectNode(node, isCtrlDown.current, isLeftShiftSelected.current)}
              isCtrlDown={isCtrlDown.current}
              onTooltipHide={handleTooltipHide}
              onTooltipShow={handleTooltipShow}
            />
          );
        })}
      </div>
    );
  }
);

const MemoizedAscNode = React.memo(
  ({ node, nodeStyle, size, handleSelectNode, setTooltip, isCtrlDown, onTooltipShow, onTooltipHide }: any) => {
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
            if (isCtrlDown) {
              handleSelectNode(node);
            } else {
              onTooltipShow(node, event);
            }
          }}
          onMouseLeave={onTooltipHide}
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

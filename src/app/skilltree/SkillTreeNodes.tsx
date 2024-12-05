"use client";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import React from "react";
import { calculateNodeStyle } from "./myUtils";
import { useTooltip } from "./useToolTip";
import { useKeyPress } from "./useKeyPress";
import { useNodeSelector } from "../context/nodeSelector";

export type NodeSize = 'small' | 'notable' | 'keystone';

interface ColorsFromSizeType {
  unSelected: Record<NodeSize, string>;
  selected: Record<NodeSize, string>;
}

const ColorsFromSize: ColorsFromSizeType = {
  unSelected: {
    keystone: 'rgba(22, 163, 74, 1)',
    notable: 'rgba(34, 197, 94, 0.75)',
    small: 'rgba(134, 239, 172, 0.5)',
  },
  selected: {
    keystone: 'rgba(220, 38, 38, 1)',
    notable: 'rgba(244, 63, 63, 0.75)',
    small: 'rgba(252, 129, 129, 0.5)',
  },
};

const sizes: Record<NodeSize, string> = {
  small: '8px',
  notable: '10.5px',
  keystone: '15.5px'
}

interface Props {
  nodes: Record<NodeSize, SkillNode[]>
  filterNodes: string[];
  searchQuery: string;
  zoomRef: any;
}

export const SkillTreeNodes = React.memo(
  ({ nodes, filterNodes, searchQuery, zoomRef }: Props) => {
    const { isNodeSelected } = useCharacterContext();
    const { handleSelectNode } = useNodeSelector();
    const { showToolTip, handleTooltipHide, handleTooltipShow } = useTooltip(zoomRef);
    const { isCtrlDown, isLeftShiftSelected } = useKeyPress();

    // Loop over the node sizes
    const renderNodesBySize = (nodeSize: NodeSize, nodesOfSize: SkillNode[]) => {
      return nodesOfSize.map((node) => {
        const isSelected = isNodeSelected(node.id);
        const nodeStyle = calculateNodeStyle(
          node,
          isSelected,
          filterNodes,
          searchQuery,
          nodeSize, // Pass nodeSize to determine the style
          ColorsFromSize
        );

        return (
          <MemoizedNode
            key={node.id}
            node={node}
            nodeStyle={nodeStyle}
            size={sizes[nodeSize]}
            handleSelectNode={() =>
              handleSelectNode(node, isCtrlDown.current, isLeftShiftSelected.current)
            }
            onTooltipShow={handleTooltipShow}
            onTooltipHide={handleTooltipHide}
            isCtrlDown={isCtrlDown.current}
          />
        );
      });
    };

    return (
      <div>
        {showToolTip()}
        {/* Loop over all the node sizes and render the corresponding nodes */}
        {['small', 'notable', 'keystone'].map((nodeSize) => (
          <div key={nodeSize}>
            {renderNodesBySize(nodeSize as NodeSize, nodes[nodeSize as NodeSize])}
          </div>
        ))}
      </div>
    );
  }
);

const MemoizedNode = React.memo(
  ({ node, nodeStyle, size, handleSelectNode, onTooltipShow, onTooltipHide, isCtrlDown }: any) => {
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
            pointerEvents: "auto",
            borderRadius: "50%",
            padding:
              size === "10.5px" ? "8px" : size === "8px" ? "6px" : "",
          }}
        />
      </div>
    );
  }
);
MemoizedNode.displayName = "MemoizedNode"
SkillTreeNodes.displayName = "SkillTreeNodes";

// Note: You'll need to implement the showToolTip function separately
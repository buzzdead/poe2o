"use client";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import { SkillTreeNodes } from "./SkillTreeNodes";

interface Props {
  zoomRef: any
}

export const SkillTreeNodeParent = ({zoomRef}: Props) => {
  // Deduplicate nodes based on their 'id'
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();

  const nodeGroups = [
    { size: "15.5px", nodes: nodes.keystones },
    { size: "10.5px", nodes: nodes.notables },
    { size: "8px", nodes: nodes.smalls },
  ];

  return (
    <>
      <SearchInput
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
      />
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
    </>
  );
};

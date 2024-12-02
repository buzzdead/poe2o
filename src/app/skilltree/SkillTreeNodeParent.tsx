"use client";
import { SearchInput, useNodeSearch } from "./NodeHighlighter";
import nodes from "../data/merged_nodes.json";
import { SkillTreeNodes } from "./SkillTreeNodes";

export const SkillTreeNodeParent = () => {
  // Deduplicate nodes based on their 'id'
  const { searchQuery, handleSearchChange, filterNodes } = useNodeSearch();

  const nodeGroups = [
    { size: "15px", nodes: nodes.keystones },
    { size: "7.5px", nodes: nodes.notables },
    { size: "5px", nodes: nodes.smalls },
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
        />
      ))}
    </>
  );
};

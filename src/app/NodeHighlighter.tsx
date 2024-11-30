// useNodeSearch.ts
import { useState, useEffect } from "react";
import filterNodesData from "./data/filter_nodes.json"; // Load the filtered nodes
import React from "react";
import { Input } from "../components/ui/input";

export const useNodeSearch = () => {
  const [filterNodes, setFilterNodes] = useState<string[]>([]); // Store the filtered nodes
  const [searchQuery, setSearchQuery] = useState(""); // Store the search query

  // Load the filtered nodes data
  useEffect(() => {
    setFilterNodes(filterNodesData.nodes.map(e => e.name)); // Initialize with the filtered nodes
  }, []);

  // Handle the search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Filter nodes based on the search query
  const getFilteredNodes = () => {
    // If searchQuery is empty, return no nodes (or can be left as is)
    if (searchQuery.trim() === "") {
      return []; // Don't highlight any nodes if search query is empty
    }

    return filterNodes.filter((node) =>
      // Only include nodes with non-empty names that match the query
      node.trim() !== "" && node.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return {
    filterNodes: getFilteredNodes(),
    searchQuery,
    handleSearchChange,
  };
};

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="absolute top-4 left-4 z-10 w-full flex justify-center">
      <Input
        type="text"
        placeholder="Search nodes..."
        value={searchQuery}
        className="w-1/6"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
};

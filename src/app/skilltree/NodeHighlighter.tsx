import { useState, useEffect, useMemo, useCallback } from "react";
import filterNodesData from "../data/combined_filtered_nodes.json";
import React from "react";
import { Input } from "../../components/ui/input";

export const useNodeSearch = () => {
  const [searchQuery, setSearchQuery] = useState(""); 
  const [debouncedQuery, setDebouncedQuery] = useState(""); 

  // Memoize the full list of filterable nodes
  const filterNodes = useMemo(() => 
    filterNodesData.nodes.map(e => e.name), 
    []
  );

  // Debounce the search query
  useEffect(() => {
    // Create a reference to the timeout
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 150);

    // Clear the previous timeout on each change
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Memoize filtered nodes to prevent unnecessary recalculations
  const filteredNodes = useMemo(() => {
    // If debouncedQuery is empty, return no nodes
    if (debouncedQuery.trim() === "") {
      return [];
    }

    return filterNodes.filter((node) =>
      node.trim() !== "" && 
      node.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, filterNodes]);

  // Handle the search query change
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return {
    filterNodes: filteredNodes,
    searchQuery,
    handleSearchChange,
  };
};

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(({ 
  searchQuery, 
  handleSearchChange 
}) => {
  return (
    <div className="absolute top-4 left-4 z-10 w-full flex flex-col items-center select-none">
      {/* New row above the search input */}
      <div className="absolute -top-5 w-2/6 text-sm text-gray-100 text-center">
        <span>Shift click to select all of same type, ctrl to auto select</span>
      </div>

      {/* Search input */}
      <Input
        type="text"
        placeholder="Search nodes (By name or description)..."
        value={searchQuery}
        className="w-1/6 mt-2"
        onChange={(e) => handleSearchChange(e.target.value)}
      />
    </div>
  );
});
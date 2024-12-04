import { useState, useCallback } from "react";
import Fuse from "fuse.js";
import filterNodesData from "../data/combined_filtered_nodes.json";

// Initialize Fuse.js with the filter nodes data
const fuse = new Fuse(filterNodesData.nodes, {
  keys: ['name', 'description'],
  threshold: 0.3,
  includeScore: true,
});

export const useNodeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNodes, setFilteredNodes] = useState<string[]>([]);

  // Handle search query change and filter nodes using Fuse
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query); // Update the search query state

    if (query.trim().length >= 2) {
      // Perform the search using Fuse.js
      const results = fuse.search(query)
        .map(result => result.item.name)
        .slice(0, 10); // Limit to top 10 results

      setFilteredNodes(results); // Update the filtered nodes state
    } else {
      setFilteredNodes([]); // Clear filtered nodes if query is too short
    }
  }, []);

  return {
    filterNodes: filteredNodes,
    searchQuery,
    handleSearchChange,
  };
};

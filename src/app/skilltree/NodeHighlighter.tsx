import { useState, useEffect, useMemo, useCallback } from "react";
import filterNodesData from "../data/combined_filtered_nodes.json";
import React from "react";
import { Input } from "../../components/ui/input";
import { X } from "lucide-react"; // Using Lucide Icons (ShadCN supports these)

export const useNodeSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Memoize the full list of filterable nodes
  const filterNodes = useMemo(
    () => filterNodesData.nodes.map((e) => e.name),
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

    return filterNodes.filter(
      (node) =>
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

export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ searchQuery, handleSearchChange }) => {
    const [scrollY, setScrollY] = useState(0);

    // Track scroll position
    useEffect(() => {
      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    // Determine styles based on scroll position
    const searchBarStyle: React.CSSProperties = {
      position: scrollY > 205 ? "fixed" : "absolute",
      top: scrollY > 205 ? "44px" : "16px",
      transition: "top 0.3s ease",
      zIndex: 10,
    };

    return (
      <div
        style={searchBarStyle}
        className="w-full flex flex-col items-center select-none"
      >
        <div className="absolute -top-5 w-2/6 text-sm text-white text-center">
          <span>
            Shift click to select all of same type - Hold Ctrl to auto select -
            Shift scroll to zoom - Scroll to scroll :)
          </span>
        </div>

        <div className="relative w-1/6">
          <Input
            type="text"
            placeholder="Search nodes (By name or description)..."
            value={searchQuery}
            className="pr-10 mt-2 focus:border-blue-300 focus:bg-gray-950 bg-background/75"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {/* Clear Button */}
          {searchQuery && (
            <button
              onClick={() => handleSearchChange("")} // Clear the input
              className="absolute top-4 right-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

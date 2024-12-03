import { useState, useEffect } from "react";
import React from "react";
import { Input } from "../../components/ui/input";
import { X } from "lucide-react";

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ searchQuery, handleSearchChange }) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);
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

    // Debounce effect
    useEffect(() => {
      // Create a timeout
      const timeoutId = setTimeout(() => {
        // Only call handleSearchChange when local query is different
        if (localQuery !== searchQuery) {
          handleSearchChange(localQuery);
        }
      }, 150);

      // Cleanup timeout
      return () => clearTimeout(timeoutId);
    }, [localQuery, searchQuery, handleSearchChange]);

    // Determine styles based on scroll position
    const searchBarStyle: React.CSSProperties = {
      position: scrollY > 205 ? "fixed" : "absolute",
      top: scrollY > 205 ? "44px" : "16px",
      transition: "top 0.3s ease",
      zIndex: 10,
    };

    // Handler for input changes
    const handleLocalChange = (value: string) => {
      setLocalQuery(value);
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
            value={localQuery}
            className="pr-10 mt-2 focus:border-blue-300 focus:bg-gray-950 bg-background/75"
            onChange={(e) => handleLocalChange(e.target.value)}
          />
          {/* Clear Button */}
          {localQuery && (
            <button
              onClick={() => {
                setLocalQuery("");
                handleSearchChange("");
              }}
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
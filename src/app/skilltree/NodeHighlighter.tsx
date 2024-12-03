import { useState, useEffect } from "react";
import React from "react";
import { Input } from "../../components/ui/input";
import { X, Info, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (query: string) => void;
}

export const SearchInput: React.FC<SearchInputProps> = React.memo(
  ({ searchQuery, handleSearchChange }) => {
    const [localQuery, setLocalQuery] = useState(searchQuery);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInfoMode, setIsInfoMode] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 205);
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);

    useEffect(() => {
      const timeoutId = setTimeout(() => {
        if (localQuery !== searchQuery) {
          handleSearchChange(localQuery);
        }
      }, 200);

      return () => clearTimeout(timeoutId);
    }, [localQuery, searchQuery, handleSearchChange]);

    const handleLocalChange = (value: string) => {
      setLocalQuery(value);
    };

    return (
      <motion.div
      initial={{ top: "0px", position: "absolute" }}
      animate={{
        top: isScrolled ? "12px" : "0px",
        position: isScrolled ? "fixed" : "absolute",
      }}
      className="w-full flex flex-col items-center select-none z-10"
    >
      <motion.div
        // Animate the width of the container regardless of the mode
        animate={{
          width: isInfoMode ? "33%" : "16%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative"
      >
        <AnimatePresence mode="wait">
          {isInfoMode ? (
            <motion.div
              key="text"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.1 }}
              className="flex items-center justify-between pr-10 mt-2 bg-background/75 focus-within:border-blue-300 focus-within:bg-gray-950 rounded"
            >
              <span className="text-accent-cold text-center w-full">
              Shift + Click to select all nodes of same type - Hold Ctrl and drag over nodes to auto select - Shift scroll the tree to zoom - Scroll to scroll :)
              </span>
              <button
                onClick={() => setIsInfoMode(false)}
                className="absolute bottom-[-20%] right-0 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <Check className="w-8 h-8 text-green-700" />
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="input"
              initial={{ opacity: 0, scale: 0.15 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.15 }}
              transition={{ duration: 0.25 }}
              className="relative"
            >
              <Input
                type="text"
                placeholder="Search nodes (By name or description)..."
                value={localQuery}
                className="pr-10 mt-2 bg-background/75 focus-within:border-blue-300 focus-within:bg-gray-950 rounded backdrop-blur-sm"
                onChange={(e) => handleLocalChange(e.target.value)}
              />
              {localQuery ? (
                <button
                  onClick={() => {
                    setLocalQuery("");
                    handleSearchChange("");
                  }}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => setIsInfoMode(true)}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <Info className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
    )});

SearchInput.displayName = "SearchInput";

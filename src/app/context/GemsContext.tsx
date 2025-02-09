"use client"

import React, { createContext, useState, ReactNode, useMemo, useContext, useEffect } from "react";
import skillGems from "../data/skillGems.json";
import supportGems from "../data/supportGems.json";
import spiritGems from "../data/spiritGems.json";
import { Gem } from "../types";

interface GemsContextType {
  page: number;
  setPage: (page: number) => void;
  displayedGems: Gem[];
  allGems: number;
  filters: {
    skillGems: boolean;
    supportGems: boolean;
    spiritGems: boolean;
  };
  setFilters: (filters: Partial<GemsContextType["filters"]>) => void;
  tagFilters: string[];
  selectedGems: Gem[];
  setSelectedGems: (gem: Gem[]) => void;
  toggleTagFilter: (tag: string) => void;
  clearTagFilters: () => void;
}

const GemsContext = createContext<GemsContextType | undefined>(undefined);
type GemWithType = Gem & {type: string}

export const GemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [page, setPage] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedGems, setMyGems] = useState<Gem[]>([])
  const [filters, setFilters] = useState({
    skillGems: false,
    supportGems: false,
    spiritGems: false,
  });
  const [tagFilters, setTagFilters] = useState<string[]>([]);

  const setSelectedGems = (gems: Gem[]) => {
    setMyGems(gems)
  }

  // Memoize all gems with type labels
  const allGems: GemWithType[] = useMemo(() => {
    return [
      ...skillGems.map(gem => ({ ...gem, type: "skillGems" })),
      ...supportGems.map(gem => ({ ...gem, type: "supportGems" })),
      ...spiritGems.map(gem => ({ ...gem, type: "spiritGems" })),
    ].sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  useEffect(() => {
    const savedFilters = localStorage.getItem("filters");
    const savedPage = localStorage.getItem("page");
    const savedTags = localStorage.getItem("tagFilters");
  
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
    if (savedPage) {
      setPage(Number(savedPage));
    }
    if (savedTags) {
      setTagFilters(JSON.parse(savedTags));
    }
  
    setIsHydrated(true);
  }, []);
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
    localStorage.setItem("page", String(page));
    localStorage.setItem("tagFilters", JSON.stringify(tagFilters));
  }, [filters, page, tagFilters]);

  // Memoize displayed gems with filtering logic
  const displayedGems = useMemo(() => {
    const gemsPerPage = 20;

    // Start with all gems
    let filteredGems = allGems;

    // Apply type filters
    const activeFilters = Object.values(filters).filter(Boolean);
    if (activeFilters.length > 0 && activeFilters.length !== 3) {
      filteredGems = filteredGems.filter(
        gem =>
          (filters.skillGems && gem.type === "skillGems") ||
          (filters.supportGems && gem.type === "supportGems") ||
          (filters.spiritGems && gem.type === "spiritGems")
      );
    }

    // Apply tag filters
    if (tagFilters.length > 0) {
      filteredGems = filteredGems.filter(gem =>
        tagFilters.some(tag => gem.tags.includes(tag)) // Match at least one tag
      );
    }

    // Paginate
    return filteredGems
      .slice(0, page * gemsPerPage)
      .filter(gem => gem.description !== null);
  }, [page, allGems, filters, tagFilters]);

  // Memoize context value
  const contextValue = useMemo(
    () => ({
      page,
      setPage,
      displayedGems,
      allGems: allGems.length,
      filters,
      selectedGems, 
      setSelectedGems,
      tagFilters,
      setFilters: (newFilters: Partial<GemsContextType["filters"]>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
        setPage(1); // Reset page when filters change
      },
      toggleTagFilter: (tag: string) => {
        setTagFilters(prev =>
          prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
        setPage(1); // Reset page when filters change
      },
      clearTagFilters: () => {
        setTagFilters([]);
        setPage(1); // Reset page when filters change
      },
    }),
    [page, displayedGems, filters, tagFilters, allGems.length, selectedGems]
  );

  return isHydrated ? (
    <GemsContext.Provider value={contextValue}>
      {children}
    </GemsContext.Provider>
  ) : null;
};

export const useGems = () => {
  const context = useContext(GemsContext);
  if (context === undefined) {
    throw new Error("useGems must be used within a GemsProvider");
  }
  return context;
};

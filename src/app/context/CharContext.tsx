"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import { Ascendancy, Char } from "../types";

type CharacterWithAscendancy = Char & { ascendancies: Ascendancy };

export type SkillNode = {
  id: string;
  x: number;
  y: number;
  name: string;
  stats: string[];
} | {
  id: string;
  x: number;
  y: number;
  name: string;
  stats: string[];
} | {
  id: string;
  x: number;
  y: number;
  name: string;
  stats: never[];
};

type CharacterContextType = {
  characters: CharacterWithAscendancy[];
  nodes: SkillNode[];
  addNode: (node: SkillNode) => void;
  removeNode: (node: SkillNode) => void;
  toggleNodeSelection: (node: SkillNode) => void;
  addCharacter: (character: CharacterWithAscendancy) => void;
  clearCharacters: () => void;
  clearSkillTree: () => void;
  isNodeSelected: (nodeId: string) => boolean
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharacterWithAscendancy[]>([]);
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const selectedNodeIds = useRef<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false); // For initial hydration check
  const saveTimeout = useRef<NodeJS.Timeout | null>(null); // To debounce saves

  // Load from localStorage on mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    const savedNodes = localStorage.getItem("nodes");

    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
    if (savedNodes) {
      const parsedNodes = JSON.parse(savedNodes);
      setNodes(parsedNodes);
      parsedNodes.forEach((node: SkillNode) => selectedNodeIds.current.add(node.id)); // Rebuild ref
    }

    setIsHydrated(true);
  }, []);

  // Save characters and nodes to localStorage whenever they change
  const saveNodesToLocalStorage = (newNodes: SkillNode[]) => {
    if (saveTimeout.current) {
      clearTimeout(saveTimeout.current); // Clear the existing timeout
    }

    saveTimeout.current = setTimeout(() => {
      localStorage.setItem("nodes", JSON.stringify(newNodes));
    }, 150); // Delay of 300ms
  };

  // Save characters to localStorage immediately
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("characters", JSON.stringify(characters));
    }
  }, [characters, isHydrated]);

  // Save nodes to localStorage with debounce
  useEffect(() => {
    if (isHydrated) {
      saveNodesToLocalStorage(nodes);
    }
  }, [nodes, isHydrated]);

  const addCharacter = (character: CharacterWithAscendancy) => {
    setCharacters([character]); // Overwrite with a single character
  };

  const clearCharacters = () => {
    setCharacters([]);
    setNodes([]);
    selectedNodeIds.current.clear();
    localStorage.removeItem("characters");
    localStorage.removeItem("nodes");
  };

  const clearSkillTree = () => {
    setNodes([]);
    selectedNodeIds.current.clear();
  };

  const addNode = (node: SkillNode) => {
    setNodes((prev) => {
      if (!selectedNodeIds.current.has(node.id)) {
        selectedNodeIds.current.add(node.id);
        return [...prev, node];
      }
      return prev;
    });
  };

  const removeNode = (node: SkillNode) => {
    setNodes((prev) => {
      if (selectedNodeIds.current.has(node.id)) {
        selectedNodeIds.current.delete(node.id);
        return prev.filter((n) => n.id !== node.id);
      }
      return prev;
    });
  };

  const toggleNodeSelection = (node: SkillNode) => {
    if (selectedNodeIds.current.has(node.id)) {
      removeNode(node);
    } else {
      addNode(node);
    }
  };

  const isNodeSelected = (nodeId: string) => selectedNodeIds.current.has(nodeId);

  return isHydrated ? (
    <CharacterContext.Provider
      value={{
        characters,
        nodes,
        addCharacter,
        clearCharacters,
        clearSkillTree,
        addNode,
        removeNode,
        toggleNodeSelection,
        isNodeSelected,
      }}
    >
      {children}
    </CharacterContext.Provider>
  ) : null; // Render null until hydration is complete
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};
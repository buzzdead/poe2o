"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharacterWithAscendancy[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [nodes, setNodes] = useState<SkillNode[]>([]);

  const clearSkillTree = () => {
    setNodes([]);
  };

  const addCharacter = (character: CharacterWithAscendancy) => {
    setCharacters([character]); // Overwrite with a single character (adjust if needed)
  };

  // Add a single node
  const addNode = (node: SkillNode) => {
    setNodes((prevNodes) => {
      if (!prevNodes.some((existingNode) => existingNode.id === node.id)) {
        return [...prevNodes, node];
      }
      return prevNodes; // Avoid duplicate
    });
  };

  // Remove a single node
  const removeNode = (node: SkillNode) => {
    setNodes((prevNodes) => prevNodes.filter((existingNode) => existingNode.id !== node.id));
  };

  // Toggle the selection of a node
  const toggleNodeSelection = (node: SkillNode) => {
    setNodes((prevNodes) => {
      const nodeIndex = prevNodes.findIndex((existingNode) => existingNode.id === node.id);
      if (nodeIndex !== -1) {
        // Remove the node if it is already selected
        return prevNodes.filter((existingNode) => existingNode.id !== node.id);
      } else {
        // Otherwise, add the node
        return [...prevNodes, node];
      }
    });
  };

  const clearCharacters = () => {
    setCharacters([]);
    setNodes([]);
    localStorage.removeItem("characters");
    localStorage.removeItem("nodes");
  };

  return true ? (
    <CharacterContext.Provider
      value={{
        characters,
        clearSkillTree,
        addCharacter,
        nodes,
        addNode,
        removeNode,
        toggleNodeSelection,
        clearCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  ) : null;
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};
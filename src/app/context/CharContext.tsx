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
  selectNode: (node: SkillNode[]) => void;
  addCharacter: (character: CharacterWithAscendancy) => void;
  clearCharacters: () => void; // Optional to clear all characters
  clearSkillTree: () => void
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharacterWithAscendancy[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [nodes, setNodes] = useState<SkillNode[]>([]);
  const clearSkillTree = () => {
    setNodes([])
  }
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedCharacters = localStorage.getItem("characters");
    const savedNodes = localStorage.getItem("nodes");

    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    }
    if (savedNodes) {
      setNodes(JSON.parse(savedNodes));
    }
    setIsHydrated(true)
  }, []);

  // Save characters and nodes to localStorage whenever they change
  useEffect(() => {
    if(characters.length !== 0)
    localStorage.setItem("characters", JSON.stringify(characters));
  if(nodes.length !== 0)
    localStorage.setItem("nodes", JSON.stringify(nodes));
  }, [characters, nodes]);

  const addCharacter = (character: CharacterWithAscendancy) => {
    setCharacters([character]); // Overwrite with a single character (adjust if needed)
  };

  const selectNode = (nodes: SkillNode[]) => {
    setNodes(nodes);
  };

  const clearCharacters = () => {
    setCharacters([]);
    setNodes([]);
    localStorage.removeItem("characters");
    localStorage.removeItem("nodes");
  };

  return isHydrated ? (
    <CharacterContext.Provider
      value={{
        characters,
        clearSkillTree,
        addCharacter,
        nodes,
        selectNode,
        clearCharacters,
      }}
    >
      {children}
    </CharacterContext.Provider>
  ) : null
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};

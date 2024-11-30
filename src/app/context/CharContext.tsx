"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Ascendancy, Char } from "../types";

type CharacterWithAscendancy = Char & { ascendancies: Ascendancy };

type Node = {
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
}

type CharacterContextType = {
  characters: CharacterWithAscendancy[];
  nodes: Node[]
  selectNode: (node: Node[]) => void
  addCharacter: (character: CharacterWithAscendancy) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharacterWithAscendancy[]>([]);
  const [nodes, setNodes] = useState<Node[]>([])
  const addCharacter = (character: CharacterWithAscendancy) => {
    setCharacters([character]);
  };
  const selectNode = (nodes: Node[]) => {
    setNodes(nodes)
  }

  return (
    <CharacterContext.Provider value={{ characters, addCharacter, nodes, selectNode }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = (): CharacterContextType => {
  const context = useContext(CharacterContext);
  if (!context) {
    throw new Error("useCharacterContext must be used within a CharacterProvider");
  }
  return context;
};

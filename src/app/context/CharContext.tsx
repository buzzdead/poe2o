"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Ascendancy, Char } from "../types";

type CharacterWithAscendancy = Char & { ascendancies: Ascendancy };

type CharacterContextType = {
  characters: CharacterWithAscendancy[];
  addCharacter: (character: CharacterWithAscendancy) => void;
};

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider = ({ children }: { children: ReactNode }) => {
  const [characters, setCharacters] = useState<CharacterWithAscendancy[]>([]);

  const addCharacter = (character: CharacterWithAscendancy) => {
    setCharacters([character]);
  };

  return (
    <CharacterContext.Provider value={{ characters, addCharacter }}>
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

"use client";

import React, { useState } from "react";
import { useCharacterContext } from "./CharContext";
import { useGems } from "./GemsContext";
import { Button } from "../../components/ui/button";

type Setup = {
  name: string;
  characters: any; // Replace `any` with the exact type if available
  nodes: any[];
  filters: any;
  page: number;
  tagFilters: string[];
  selectedGems: any[];
};

const SaveLoadSetups = () => {
  const {
    characters,
    nodes,
    addCharacter,
    selectNode,
  } = useCharacterContext();
  const {
    page,
    setPage,
    filters,
    setFilters,
    tagFilters,
    selectedGems,
    setSelectedGems,
    clearTagFilters,
  } = useGems();

  const [savedSetups, setSavedSetups] = useState<Setup[]>(() => {
    const saved = localStorage.getItem("savedSetups");
    return saved ? JSON.parse(saved) : [];
  });

  const saveSetup = (name: string) => {
    const newSetup = {
      name,
      characters,
      nodes,
      filters,
      page,
      tagFilters,
      selectedGems,
    };
    const updatedSetups = [...savedSetups, newSetup];
    setSavedSetups(updatedSetups);
    localStorage.setItem("savedSetups", JSON.stringify(updatedSetups));
  };

  const loadSetup = (name: string) => {
    const setup = savedSetups.find((s) => s.name === name);
    if (setup) {
      addCharacter(setup.characters[0]); // Adjust if multiple characters are supported
      selectNode(setup.nodes);
      setFilters(setup.filters);
      setPage(setup.page);
      setSelectedGems(setup.selectedGems);
      if (setup.tagFilters.length === 0) {
        clearTagFilters();
      }
    }
  };

  const deleteSetup = (name: string) => {
    const updatedSetups = savedSetups.filter((s) => s.name !== name);
    setSavedSetups(updatedSetups);
    localStorage.setItem("savedSetups", JSON.stringify(updatedSetups));
  };

  return (
    <div className="fixed z-50 top-5 left-5 p-4 bg-inherit border rounded-lg shadow-lg space-y-4 w-[25rem]">
      <h2 className="text-lg font-semibold">Manage Setups</h2>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Setup Name"
          id="setupName"
          className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit"
        />
        <Button
          onClick={() => {
            const name = (document.getElementById("setupName") as HTMLInputElement)?.value;
            if (name) saveSetup(name);
          }}
        >
          Save Setup
        </Button>
      </div>

      <h3 className="text-md font-medium">Saved Setups</h3>
      <ul className="space-y-2">
        {savedSetups.map((setup) => (
          <li
            key={setup.name}
            className="flex items-center justify-between p-2 bg-inherit border rounded-md"
          >
            <span className="font-medium">{setup.name}</span>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => loadSetup(setup.name)}>
                Load
              </Button>
              <Button
                variant="destructive"
                onClick={() => deleteSetup(setup.name)}
              >
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SaveLoadSetups;

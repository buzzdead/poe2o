"use client";
import React, { useState } from "react";
import { useCharacterContext } from "./CharContext";
import { useGems } from "./GemsContext";
import { Button } from "../../components/ui/button";
import * as Collapsible from "@radix-ui/react-collapsible";

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
  const { characters, nodes, addCharacter, selectNode, clearSkillTree } =
    useCharacterContext();
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

  const [isOpen, setIsOpen] = useState(true); // State to track collapsible open/close
  const [inputValue, setInputValue] = useState("");
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
  
    // Check if a setup with the same name exists
    const existingIndex = savedSetups.findIndex((setup) => setup.name === name);
  
    let updatedSetups;
  
    if (existingIndex >= 0) {
      // If it exists, update the existing setup
      updatedSetups = [...savedSetups];
      updatedSetups[existingIndex] = newSetup;
    } else {
      // If it doesn't exist, add a new setup
      updatedSetups = [...savedSetups, newSetup];
    }
  
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
      <Collapsible.Root open={isOpen} onOpenChange={setIsOpen}>
        {/* Collapsible Trigger */}
        <Collapsible.Trigger asChild>
          <div
            className="flex justify-center items-center p-2 cursor-pointer bg-gray-800 rounded-md text-white gap-2"
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            Skill Trees
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`w-6 h-6 transform transition-transform ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </Collapsible.Trigger>

        {/* Collapsible Content */}
        <Collapsible.Content>
          <h2 className="text-lg font-semibold">Manage Setups</h2>

          <div className="flex items-center space-x-2">
          <input
              type="text"
              placeholder="Setup Name"
              id="setupName"
              className="flex-grow px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-inherit"
              value={inputValue} // Bind to the inputValue state
              onChange={(e) => setInputValue(e.target.value)} // Update state on change
            />
            <Button
              onClick={() => {
                const name = (
                  document.getElementById("setupName") as HTMLInputElement
                )?.value;
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
                  <Button
                    variant="outline"
                    onClick={() => {loadSetup(setup.name); setInputValue(setup.name)}}
                  >
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
            <div className="flex justify-center items-center">
              <Button
                className="bg-red-950 hover:bg-red-600 w-full mt-2"
                onClick={clearSkillTree}
              >
                Clear current skill tree
              </Button>
            </div>
          </ul>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  );
};

export default SaveLoadSetups;

import { useMemo } from "react";

interface CharacterStats {
  strength: number;
  dexterity: number;
  intelligence: number;
  life: number;
  mana: number;
  energyShield: number;
  evasion: number;
  armour: number;
}

function useCharacterStats(baseStats: { strength: number; dexterity: number; intelligence: number }): CharacterStats {
  const { strength, dexterity, intelligence } = baseStats;

  return useMemo(() => {
    const life = 50 + strength / 2; // Example scaling
    const mana = 40 + intelligence / 2;
    const energyShield = intelligence * 0.2; // Derived from Int
    const evasion = dexterity * 2; // Derived from Dex
    const armour = strength * 0.5; // Derived from Str

    return {
      strength,
      dexterity,
      intelligence,
      life,
      mana,
      energyShield,
      evasion,
      armour,
    };
  }, [strength, dexterity, intelligence]);
}

export default useCharacterStats;

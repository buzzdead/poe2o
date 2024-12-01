// Define the available character types
export type CharacterType = "Warrior" | "Sorceress" | "Witch" | "Mercenary" | "Ranger" | "Monk";

// Define the structure of base stats for each character
export interface BaseStats {
  strength: number;
  dexterity: number;
  intelligence: number;
  life: number;
  mana: number;
  energyShield: number;
  evasion: number;
  armour: number;
}

// Define the base stats as an object with character type as the key
export const baseStats: Record<CharacterType, BaseStats> = {
  Warrior: {
    strength: 40,
    dexterity: 20,
    intelligence: 10,
    life: 70,
    mana: 30,
    energyShield: 0,
    evasion: 10,
    armour: 15,
  },
  Sorceress: {
    strength: 10,
    dexterity: 15,
    intelligence: 40,
    life: 50,
    mana: 60,
    energyShield: 20,
    evasion: 5,
    armour: 5,
  },
  Witch: {
    strength: 15,
    dexterity: 10,
    intelligence: 40,
    life: 55,
    mana: 50,
    energyShield: 25,
    evasion: 5,
    armour: 5,
  },
  Mercenary: {
    strength: 25,
    dexterity: 35,
    intelligence: 15,
    life: 60,
    mana: 40,
    energyShield: 10,
    evasion: 20,
    armour: 10,
  },
  Ranger: {
    strength: 20,
    dexterity: 40,
    intelligence: 15,
    life: 55,
    mana: 40,
    energyShield: 5,
    evasion: 25,
    armour: 5,
  },
  Monk: {
    strength: 30,
    dexterity: 25,
    intelligence: 25,
    life: 65,
    mana: 35,
    energyShield: 10,
    evasion: 15,
    armour: 10,
  },
};

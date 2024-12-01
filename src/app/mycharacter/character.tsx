import React, { useState } from 'react';
import {
  Shield, Zap, Flame, Snowflake, Asterisk,
  Dumbbell, Brain, Crosshair, ShieldIcon, Wind} from 'lucide-react';
import { cn } from "@/lib/utils";
import useCharacterStats from './useCharacterStats';
import { baseStats, CharacterType } from './characterbase';

interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

function StatBox({ label, value, icon, className }: StatProps) {
  return (
    <div className={cn("flex flex-col items-center gap-1 rounded-sm bg-black/20 p-3", className)}>
      {icon}
      <div className="text-xs text-gray-400">{label}</div>
      <div className="font-bold text-gray-200">{value}</div>
    </div>
  );
}

function DefensiveStatBox({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="rounded-full bg-black/20 p-2">
        <div className="text-gray-400">{icon}</div>
      </div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-bold text-gray-200">{value}</div>
    </div>
  );
}

function ResistanceRow({ type, value, icon }: { type: string; value: string; icon: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-sm bg-black/20 px-3 py-2">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm text-gray-300">{type}</span>
      <span className="ml-auto font-bold text-gray-200">{value}</span>
    </div>
  );
}

export default function CharacterPanel() {
  const [characterType, setCharacterType] = useState<CharacterType>("Warrior");
  const defaultChar = baseStats[characterType];
  const characterStats = useCharacterStats(defaultChar);

  return (
    <div className="w-[400px] rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-4 shadow-xl">
      {/* Header */}
      <div className="mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-800" />
          <div>
            <h2 className="text-xl font-bold text-gray-200">Character Name</h2>
            <p className="text-sm text-gray-400">Level 31 {characterType}</p>
            <select
              value={characterType}
              onChange={(e) => setCharacterType(e.target.value as CharacterType)}
              className="mt-2 rounded border border-gray-600 bg-gray-800 text-gray-200 text-sm"
            >
              {Object.keys(baseStats).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-6 grid grid-cols-3 gap-2">
        <StatBox
          label="Strength"
          value={characterStats.strength}
          icon={<Dumbbell className="h-5 w-5 text-red-400" />}
        />
        <StatBox
          label="Intelligence"
          value={characterStats.intelligence}
          icon={<Brain className="h-5 w-5 text-blue-400" />}
        />
        <StatBox
          label="Dexterity"
          value={characterStats.dexterity}
          icon={<Crosshair className="h-5 w-5 text-green-400" />}
        />
      </div>

      {/* Main Stats */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        <StatBox
          label="Life"
          value={characterStats.life}
          icon={<Shield className="h-5 w-5 text-red-500" />}
        />
        <StatBox
          label="Energy Shield"
          value={characterStats.energyShield.toFixed(1)}
          icon={<ShieldIcon className="h-5 w-5 text-blue-400" />}
        />
        <StatBox
          label="Mana"
          value={characterStats.mana}
          icon={<Zap className="h-5 w-5 text-blue-500" />}
        />
        <StatBox
          label="Armour"
          value={characterStats.armour.toFixed(1)}
          icon={<Shield className="h-5 w-5 text-yellow-400" />}
        />
      </div>

      {/* Defensive Stats */}
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Defensive Stats</h3>
        <div className="grid grid-cols-3 gap-2">
          <DefensiveStatBox label="Armour" value={characterStats.armour.toFixed(1)} icon={<ShieldIcon className="h-4 w-4" />} />
          <DefensiveStatBox label="Evasion" value={characterStats.evasion.toFixed(1)} icon={<Wind className="h-4 w-4" />} />
        </div>
      </div>

      {/* Resistances */}
      <div className="space-y-2">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-400">Resistances</h3>
        <ResistanceRow type="Fire" value="10%" icon={<Flame className="h-4 w-4 text-red-500" />} />
        <ResistanceRow type="Cold" value="10%" icon={<Snowflake className="h-4 w-4 text-blue-400" />} />
        <ResistanceRow type="Lightning" value="10%" icon={<Zap className="h-4 w-4 text-yellow-400" />} />
        <ResistanceRow type="Chaos" value="0%" icon={<Asterisk className="h-4 w-4 text-purple-500" />} />
      </div>
    </div>
  );
}

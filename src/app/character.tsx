import React from 'react';
import { Shield, Zap, Flame, Snowflake, Cloud, Asterisk, Dumbbell, Brain, Crosshair, ShieldIcon, Wind, MinusCircle, ShieldOff, ShieldX } from 'lucide-react';
import { cn } from "@/lib/utils";

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
  return (
    <div className="w-[400px] rounded-lg border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-4 shadow-xl">
      {/* Header */}
      <div className="mb-6 border-b border-gray-800 pb-4">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-gray-800" />
          <div>
            <h2 className="text-xl font-bold text-gray-200">Character Name</h2>
            <p className="text-sm text-gray-400">Level 31 Sorcerer</p>
          </div>
        </div>
      </div>

      {/* Attributes */}
      <div className="mb-6 grid grid-cols-3 gap-2">
        <StatBox label="Strength" value="24" icon={<Dumbbell className="h-5 w-5 text-red-400" />} />
        <StatBox label="Intelligence" value="140" icon={<Brain className="h-5 w-5 text-blue-400" />} />
        <StatBox label="Dexterity" value="38" icon={<Crosshair className="h-5 w-5 text-green-400" />} />
      </div>

      {/* Main Stats */}
      <div className="mb-6 grid grid-cols-4 gap-2">
        <StatBox label="Life" value="200" icon={<Shield className="h-5 w-5 text-red-500" />} />
        <StatBox label="Shield" value="200" icon={<Shield className="h-5 w-5 text-blue-400" />} />
        <StatBox label="Mana" value="200" icon={<Zap className="h-5 w-5 text-blue-500" />} />
        <StatBox label="Spirit" value="100" icon={<Cloud className="h-5 w-5 text-purple-400" />} />
      </div>

      {/* Defensive Stats */}
      <div className="mb-6">
        <h3 className="mb-4 text-sm font-semibold uppercase text-gray-400">Defence</h3>
        <div className="grid grid-cols-5 gap-2">
          <DefensiveStatBox label="Armour" value="0%" icon={<ShieldIcon className="h-4 w-4" />} />
          <DefensiveStatBox label="Evasion" value="0%" icon={<Wind className="h-4 w-4" />} />
          <DefensiveStatBox label="Suppression" value="0%" icon={<MinusCircle className="h-4 w-4" />} />
          <DefensiveStatBox label="Deflect" value="0%" icon={<ShieldOff className="h-4 w-4" />} />
          <DefensiveStatBox label="Block" value="0%" icon={<ShieldX className="h-4 w-4" />} />
        </div>
      </div>

      {/* Resistances */}
      <div className="space-y-2">
        <h3 className="mb-3 text-sm font-semibold uppercase text-gray-400">Resistance</h3>
        <ResistanceRow type="Fire" value="10%" icon={<Flame className="h-4 w-4 text-red-500" />} />
        <ResistanceRow type="Cold" value="10%" icon={<Snowflake className="h-4 w-4 text-blue-400" />} />
        <ResistanceRow type="Lightning" value="10%" icon={<Zap className="h-4 w-4 text-yellow-400" />} />
        <ResistanceRow type="Chaos" value="0%" icon={<Asterisk className="h-4 w-4 text-purple-500" />} />
      </div>

      {/* Stats Breakdown */}
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-300">Life</h3>
          <div className="space-y-1 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Maximum Life</span>
              <span className="text-gray-300">447</span>
            </div>
            <div className="flex justify-between">
              <span>Life Recovery Per Second</span>
              <span className="text-gray-300">6.6</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-300">Energy Shield</h3>
          <div className="space-y-1 text-sm text-gray-400">
            <div className="flex justify-between">
              <span>Maximum Energy Shield</span>
              <span className="text-gray-300">368</span>
            </div>
            <div className="flex justify-between">
              <span>Energy Shield Recharge Rate</span>
              <span className="text-gray-300">83.5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


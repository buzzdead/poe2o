"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import CustomCard from "../../components/ui/CustomCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CharacterPanel from "../character";
import { SkillNode, useCharacterContext } from "../context/CharContext";
import { Ascendancy } from "../types";
import { Sword } from "lucide-react";

const MyCharacter = () => {
  const { characters, nodes } = useCharacterContext();
  const [stat, setStat] = useState<number>(0)
  const [myNodes, setMyNodes] = useState<SkillNode[]>([])
  useEffect(() => {
    let newStat = 0; // Temporary variable to calculate the stat increment
    const myN: SkillNode[] = []
    nodes.forEach((n) => {
      if (/\d{2}/.test(n.name)) { // Check if the string contains exactly two digits
        newStat += 10;
        
      }
      else myN.push(n)
    });
    setStat(newStat); // Update the state with the calculated stat
    setMyNodes(myN)
  }, [nodes]);
  const renderStat = () => {
    if(!stat) return
    return stat / 10 + " stat nodes * 10 dex/str/int = " + stat + " total stats"
  }
  return (
    <div className="flex justify-center">
      <div className="flex-col flex gap-5">
        {characters.map((c) => (
          <div className="text-4xl text-center text-accent-foreground" key={c.name}>
            <p>{c.name}</p>
          </div>
        ))}
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="justify-center w-full">
            <TabsTrigger value="ascendancy">Ascendancy</TabsTrigger>
            <TabsTrigger value="characterpanel">Character Panel</TabsTrigger>
            <TabsTrigger value="skilltree">Skill Tree</TabsTrigger>
          </TabsList>
          <TabsContent value="ascendancy">
            {characters[0]?.ascendancies ? <AscendancyComp ascendancy={characters[0]?.ascendancies} /> :  <CustomCard
            href="/classes"
            icon={Sword}
            theme="blue"
            title="Character Classes"
            description="The upcoming Path of Exile 2 expansion introduces several new and unique character classes, each with their own playstyle, abilities, and specialties."
            linkText="View Classes"
          />}
          </TabsContent>
          <TabsContent value="characterpanel">
            <CharacterPanel />
          </TabsContent>
          <TabsContent value="skilltree">
            <div className="flex flex-col gap-5 justify-center text-center p-5">
              {renderStat()}
              {myNodes.map((n) => (
  <Tooltip key={n?.name} node={n}>
    <div className="cursor-pointer text-accent-light hover:underline">
      {n?.name}
    </div>
  </Tooltip>
))}
          </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCharacter;

interface AscProps {
  ascendancy: Ascendancy;
}
const AscendancyComp = ({ ascendancy }: AscProps) => {
  return (
    <Card
      key={ascendancy.name}
      className="bg-secondary/5 border border-primary/10 hover:border-primary/20 transition-colors"
    >
      <CardContent className="p-6">
        <div className="pb-4 flex flex-row justify-between">
          <h4 className="text-2xl font-semibold mb-4 text-accent-fire skill-effect-fire">
            {ascendancy.name}
          </h4>
        </div>
        <ul className="space-y-4">
          {ascendancy.nodes.map((skill) => (
            <li key={skill.name} className="list-none skill-effect">
              <span className="font-medium text-lg text-accent-lightning/80 underline-offset-2 underline">
                {skill.name}
              </span>
              {skill.effect && (
                <p className="text-sm font-bold text-accent-cold mt-2 skill-effect-cold">
                  {skill.effect}
                </p>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

interface TooltipProps {
  node: SkillNode; // The node data
  children: React.ReactNode; // Content that will trigger the tooltip
}

const Tooltip = ({ node, children }: TooltipProps) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className="absolute bg-black/95 backdrop-blur-sm text-white p-4 rounded-lg w-72 flex flex-col z-50 pointer-events-none shadow-xl"
          style={{
            left: "50%",
            top: "120%",
            transform: "translate(-50%, 0)",
            boxShadow: `
              0 0 0 1px rgba(16, 185, 129, 0.2),
              0 0 0 2px rgba(16, 185, 129, 0.3),
              0 0 0 4px rgba(16, 185, 129, 0.1),
              0 0 20px 4px rgba(16, 185, 129, 0.1)
            `,
          }}
        >
          <h3 className="text-xl font-semibold text-center mb-3 text-emerald-200">
            {node?.name || "Unknown Node"}
          </h3>
          <ul className="list-disc pl-5 space-y-2.5">
            {node?.stats?.map((stat: string, index: number) => (
              <li
                key={index}
                className="text-sm text-emerald-100 leading-relaxed"
              >
                {stat}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
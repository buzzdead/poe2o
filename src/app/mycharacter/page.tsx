"use client";
import { Card, CardContent } from "../../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import CharacterPanel from "../character";
import { useCharacterContext } from "../context/CharContext";
import { Ascendancy } from "../types";

const MyCharacter = () => {
  const { characters, nodes } = useCharacterContext();
  return (
    <div className="flex justify-center">
      <div className="flex-col flex gap-5">
        {characters.map((c) => (
          <div className="text-4xl text-center text-accent-foreground" key={c.name}>
            <p>{c.name}</p>
          </div>
        ))}
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="ascendancy">Ascendancy</TabsTrigger>
            <TabsTrigger value="characterpanel">Character Panel</TabsTrigger>
            <TabsTrigger value="skilltree">Skill Tree</TabsTrigger>
          </TabsList>
          <TabsContent value="ascendancy">
            <AscendancyComp ascendancy={characters[0]?.ascendancies} />
          </TabsContent>
          <TabsContent value="characterpanel">
            <CharacterPanel />
          </TabsContent>
          <TabsContent value="skilltree">
            <div className="flex flex-col gap-5 justify-center text-center p-5">
          {nodes.map(n => <div key={n?.name}>{n?.name}</div>)}
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

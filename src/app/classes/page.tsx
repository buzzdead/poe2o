"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Char = { name: string; image: string; info: string };
const classes: Char[] = [
  {
    name: "Druid",
    image: "/druid.webp",
    info: "The Druid is a primal shapeshifter, able to transform into powerful beasts like bears and wolves while wielding elemental magic. This hybrid class blends ferocious melee combat with spellcasting, offering a dynamic and complex experience for players who enjoy versatility and raw power.",
  },
  {
    name: "Huntress",
    image: "/huntress.webp",
    info: "Focusing on spears, the Huntress blends ranged and melee combat with speed and agility. Known for swift movement and devastating strikes, this class offers a dynamic playstyle with a focus on positioning. Still evolving, it promises exciting hybrid gameplay for those who enjoy versatility.",
  },
  {
    name: "Mercenary",
    image: "/mercenary.webp",
    info: "Combining crossbow skills with explosive grenades, the Mercenary is a tactical and versatile fighter. Specializing in ranged combat with elemental effects and grenade combos, this class offers diverse options for players who enjoy a more complex, strategic playstyle with lots of tools at their disposal.",
  },
  { name: "Monk", image: "/monk.webp", info: "The Monk is a mobile warrior who balances agile melee combat with powerful elemental abilities. Known for quick strikes with a staff and explosive magical attacks, this class rewards players who enjoy fast, combo-based combat and intricate skill management." },
  {
    name: "Ranger",
    image: "/ranger.webp",
    info: "The Ranger is a swift, dexterous archer who excels in ranged combat. With an array of elemental arrows and mobility-focused abilities, they can adapt to many playstyles, from poison attacks to crowd control. Ideal for players who prefer fast-paced, ranged combat with plenty of movement.",
  },
  {
    name: "Sorceress",
    image: "/sorceress.webp",
    info: "A classic spellcaster, the Sorceress wields the elemental forces of fire, cold, and lightning to decimate enemies. Ideal for players who crave flashy, high-damage spellcasting, this class offers explosive power and strategic combat, providing a rich experience for those who enjoy magical destruction.",
  },
  {
    name: "Warrior",
    image: "/warrior.webp",
    info: "The Warrior is a mighty melee tank with a focus on brutal two-handed weapon combat. Specializing in high durability and damage, they are perfect for players who enjoy smashing enemies up close. While challenging for beginners, their immense resilience and powerful attacks make them a rewarding choice for advanced players.",
  },
  {
    name: "Witch",
    image: "/witch.webp",
    info: "A master of dark magic and summoning, the Witch controls hordes of minions to overwhelm enemies. With powerful elemental and necrotic abilities, this class is perfect for players who prefer casting and strategy. Its beginner-friendly nature makes it an excellent starting point for new players.",
  },
];

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState<Char>(classes[0]);

  return (
    <div className="w-full max-w-4xl mx-auto p-2">
        <div className="text-3xl font-extrabold font-sans bg-clip-text text-blue-800 text-center pb-6" >Character classes</div>
      <Carousel opts={{ dragFree: true, dragThreshold: 20 }} className="w-full mb-8">
        <CarouselContent>
          {classes.map((classItem, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card
                  className={`cursor-pointer transition-all hover:scale-105`}
                  onClick={() => setSelectedClass(classItem)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <img
                      src={classItem.image}
                      alt={classItem.name}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                    />
                    <h3 className={`text-lg font-semibold absolute bottom-1 left-1 text-white bg-black/50 px-2 py-2 rounded select-none ${classItem.name === selectedClass.name && "text-blue-600"}`}>
                      {classItem.name}
                    </h3>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {selectedClass && (
        <Card className="border-muted/50 bg-card/20 backdrop-blur-sm">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">
              {selectedClass.name}
            </h2>
            <p className="text-card-foreground">{selectedClass.info}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Classes;

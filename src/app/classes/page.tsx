"use client";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import classAscendancy from "../data/classAscendancy.json";
import { Brain } from "lucide-react";
import { useToast } from "../../hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { Ascendancy, Char, ClassesWithAscendancy } from "../types";
import { useCharacterContext } from "../context/CharContext";
import Link from "next/link";
import { MyClasses } from "./const";

const Classes = () => {
  const [selectedClass, setSelectedClass] = useState<Char>(MyClasses[0]);
  const { toast } = useToast()

  const { addCharacter } = useCharacterContext();
  const [classAscendancies, setClassAscendancies] = useState<ClassesWithAscendancy[]>([])
  useEffect(() => {
    // Map over the classAscendancy data to ensure it matches the ClassesWithAscendancy type
    const mappedAscendancies: ClassesWithAscendancy[] = classAscendancy.classes.map((item) => {
      // Explicitly return the item as ClassesWithAscendancy if you're confident about its shape
      return item as ClassesWithAscendancy;
    });
    // Set the state with the mapped data
    setClassAscendancies(mappedAscendancies);
  }, []);

  const handleAddCharacter = (ascendancy: Ascendancy) => {
    const classData = classAscendancies.find(
      (e) => e.name?.trim() === selectedClass.name?.trim()
    );

    if (!classData) {
      toast({
        title: "Error",
        description: "No ascendancy data available for this class.",
        action: <ToastAction altText="Dismiss">Close</ToastAction>,
      });
      return;
    }

    const newCharacter = {
      ...selectedClass,
      ascendancies: ascendancy
    };
    addCharacter(newCharacter)
    toast({
      title: "Character Added",
      description: `${selectedClass.name} has been added to your state.`,
      action: <ToastAction altText="Dismiss"><Link href="./mycharacter">Go to char</Link></ToastAction>,
    });
  };
  
  const renderClassAsc = () => {
    const classData = classAscendancies.find(
      (e) => e.name?.trim() === selectedClass.name?.trim()
    );
  
    if (!classData) {
      return <p>No ascendancy data available for this class.</p>;
    }
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {classData.ascendancies.map((ascendancy) => (
          <Card 
            key={ascendancy.name} 
            className="bg-secondary/5 border border-primary/10 hover:border-primary/20 transition-colors"
          >
            <CardContent className="p-6">
              <div className="pb-4 flex flex-row justify-between">
            <h4 className="text-2xl font-semibold mb-4 text-accent-fire skill-effect-fire">
              {ascendancy.name}
            </h4>
            <Brain className="text-blue-400 cursor-pointer hover:text-blue-300 hover:animate-shake transition-all duration-150" onClick={() => handleAddCharacter(ascendancy)}/>


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
        ))}
      </div>
    );
  };
  return (
    <div className="w-full max-w-4xl mx-auto p-2">
      <div className="text-3xl font-extrabold font-sans bg-clip-text text-blue-800 text-center pb-6">
        Character classes
      </div>
      <Carousel
        opts={{ dragFree: true, dragThreshold: 20 }}
        className="w-full mb-8"
      >
        <CarouselContent>
          {MyClasses.map((classItem, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
              <div className="p-1">
                <Card
                  className={`cursor-pointer transition-all hover:scale-105`}
                  onClick={() => setSelectedClass(classItem)}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                    <Image
                      src={classItem.image}
                      layout="fill"
                      objectFit="cover"
                      alt={classItem.name}
                      className="absolute inset-0 w-full h-full object-cover select-none"
                    />
                    <h3
                      className={`text-lg font-semibold absolute bottom-1 left-1  bg-black/50 px-2 py-2 rounded select-none ${classItem.name === selectedClass.name ? "text-blue-600" : "text-white"}`}>
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
        <Card className="border-none bg-gradient-to-b from-background/80 to-background/40 backdrop-blur-sm shadow-2xl">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-300">
              {selectedClass.name}
            </h2>
            <p className="text-card-foreground mb-4">{selectedClass.info}</p>
            <h1>{renderClassAsc()}</h1>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Classes;

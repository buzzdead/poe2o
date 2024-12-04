import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCharacterContext } from "../context/CharContext";
import classAscendancy from "../data/classAscendancy.json";
import { MyClasses } from "../classes/const";

interface Props {
  isOpen: boolean;
  position: { top: number; left: number };
  setIsOpen: () => void;
}

type Image = { name: string; src: string };

const CircleMenu = ({ isOpen, position, setIsOpen }: Props) => {
  const { addCharacter, clearSkillTree } = useCharacterContext();
  const radius = 200; // Radius of the circle
  const images: Image[] = [
    { name: "Acolyte", src: "/ascendancy/acolyte1.webp" },
    { name: "Bloodmage", src: "/ascendancy/bloodmage1.webp" },
    { name: "Chronomancer", src: "/ascendancy/chronomancer1.webp" },
    { name: "Deadeye", src: "/ascendancy/deadeye1.webp" },
    { name: "Infernalist", src: "/ascendancy/infernalist1.webp" },
    { name: "Invoker", src: "/ascendancy/invoker1.webp" },
    { name: "Legionnaire", src: "/ascendancy/legionnaire1.webp" },
    { name: "Pathfinder", src: "/ascendancy/pathfinder1.webp" },
    { name: "Stormweaver", src: "/ascendancy/stormweaver1.webp" },
    { name: "Titan", src: "/ascendancy/titan1.webp" },
    { name: "Warbringer", src: "/ascendancy/warbringer1.webp" },
    { name: "Witchhunter", src: "/ascendancy/witchhunter1.webp" },
  ];
  const preloadImages = images.map((image) => {
    const img = new Image();
    img.src = image.src;
    return img;
  });

  React.useEffect(() => {
    preloadImages.forEach(
      (img) => (img.onload = () => console.log(`${img.src} loaded`))
    );
  }, [preloadImages]);

  const handleOnClick = (name: string) => {
    for (const classData of classAscendancy.classes) {
      for (const ascendancy of classData.ascendancies) {
        if (ascendancy.name.includes(name)) {
          const className = classData.name;
          const char = MyClasses.find((e) => e.name === className);
          if (char) {
            addCharacter({ ...char, ascendancies: ascendancy });
            clearSkillTree();
            setIsOpen();
          }
        }
      }
    }
  };

  return (
    <TooltipProvider delayDuration={20}>
      <AnimatePresence>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: 400,
              height: 400,
              margin: "auto",
            }}
          >
            {/* Circle Images */}
            {images.map((image, index) => {
              const angle = (index / images.length) * 2 * Math.PI;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <motion.img
                      draggable={false}
                      src={image.src}
                      alt={`Option ${index + 1}`}
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 1, // Add initial scale
                      }}
                      animate={{
                        x: isOpen ? x : 0,
                        y: isOpen ? y : 0,
                        opacity: isOpen ? 1 : 0,
                        scale: isOpen ? 1 : 0, // Adjust scale when menu opens
                      }}
                      exit={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                        scale: 1, // Reset scale on exit
                      }}
                      whileHover={{
                        scale: 1.1, // Increase scale on hover
                        transition: {
                          type: "spring",
                          stiffness: 300, // More responsive spring
                          damping: 10, // Less damping for a bouncier effect
                        },
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 30,
                        duration: 1.5,
                      }}
                      style={{
                        position: "absolute",
                        left: "50%",
                        width: 100,
                        zIndex: 45,
                        height: 100,
                        transform: "translate(-50%, -50%)",
                        borderRadius: "50%",
                        cursor: "pointer",
                      }}
                      onClick={() => handleOnClick(image.name)}
                    />
                  </TooltipTrigger>
                  <TooltipContent className="bg-transparent"><div className="bg-gradient-to-b from-red-800 to-background px-4 py-1 mt- rounded-3xl">
            <h3 className="text-xl text-center bg-gradient-to-r from-yellow-300 via-red-100 pb-1 to-yellow-700 bg-clip-text text-transparent">
              {image.name || "Unknown Node"}
            </h3>
          </div></TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  );
};

export default CircleMenu;

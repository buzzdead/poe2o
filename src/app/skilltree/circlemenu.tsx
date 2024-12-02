import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCharacterContext } from "../context/CharContext";
import classAscendancy from "../data/classAscendancy.json";
import { classes } from "../classes/page";

interface Props {
  isOpen: boolean;
  position: { top: number; left: number };
}

type Image = { name: string; src: string };

const CircleMenu = ({ isOpen, position }: Props) => {
  const { addCharacter, clearSkillTree } = useCharacterContext();
  const radius = 200; // Radius of the circle
  const images: Image[] = [
    { name: "Acolyte", src: "/ascendancy/acolyte.png" },
    { name: "Bloodmage", src: "/ascendancy/bloodmage.png" },
    { name: "Chronomancer", src: "/ascendancy/chronomancer.png" },
    { name: "Deadeye", src: "/ascendancy/deadeye.png" },
    { name: "Infernalist", src: "/ascendancy/infernalist.png" },
    { name: "Invoker", src: "/ascendancy/invoker.png" },
    { name: "Legionnaire", src: "/ascendancy/legionnaire.png" },
    { name: "Pathfinder", src: "/ascendancy/pathfinder.png" },
    { name: "Stormweaver", src: "/ascendancy/stormweaver.png" },
    { name: "Titan", src: "/ascendancy/titan.png" },
    { name: "Warbringer", src: "/ascendancy/warbringer.png" },
    { name: "Witchhunter", src: "/ascendancy/witchhunter.png" },
  ];

  // Internal state to manage visibility during transitions
  const [showMenu, setShowMenu] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShowMenu(true); // Show the menu when isOpen becomes true
    } else {
      // Wait for the animation to finish before hiding the menu
      const timeout = setTimeout(() => setShowMenu(false), 500); // Adjust timing to match animation
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  const handleOnClick = ({ name, src }: Image) => {
    for (const classData of classAscendancy.classes) {
      for (const ascendancy of classData.ascendancies) {
        if (ascendancy.name.includes(name)) {
          const className = classData.name;
          const char = classes.find((e) => e.name === className);
          if (char) {
            addCharacter({ ...char, ascendancies: ascendancy });
            clearSkillTree();
          }
        }
      }
    }
  };

  return (
    <AnimatePresence>
      {showMenu && (
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
              <motion.img
                key={index}
                src={image.src}
                alt={`Option ${index + 1}`}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                }}
                animate={{
                  x: isOpen ? x : 0,
                  y: isOpen ? y : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                exit={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  
                }}
                transition={{
                    type: "spring",
                    stiffness: 200, // Lower value = slower
                    damping: 30, // Higher value = slower
                    duration: 1.5, // Add a fixed duration if needed
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
                onClick={() => handleOnClick(image)}
              />
            );
          })}
        </div>
      )}
    </AnimatePresence>
  );
};

export default CircleMenu;

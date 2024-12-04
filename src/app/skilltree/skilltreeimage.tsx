"use client"
import Image from "next/image";
import React from "react";
import { useCharacterContext } from "../context/CharContext";

interface Props {
  setIsOpen: () => void
}
const SkillTreeImageComponent = ({setIsOpen}: Props) => {
  const { characters } = useCharacterContext()
  
  const scale = 0.7
    const IMAGE_WIDTH = 2750; // Width of the large image
    const IMAGE_HEIGHT = 2864; // Height of the large image
    const SMALL_IMAGE_SIZE = 320 * scale; // Size of the smaller image
    const mt = -(320 * scale * 0.460).toString() + 'px';
    const ml = -(320 * scale * 0.487).toString() + 'px';
    const handleTargetClick = () => {
      setIsOpen();
    };
    return (
        <div
            className="will-change-auto"
        >
            {/* Large Image */}
            <Image
                src="/skill-tree5.webp"
                alt="Skill Tree"
                id="image-container"
                width={IMAGE_WIDTH}
                height={IMAGE_HEIGHT}
                className="select-none"

            />
 <div
        id="target-div"
        onClick={handleTargetClick}
        style={{
          width: "200px",
          height: "200px",
          cursor: 'pointer',
          zIndex: 40,
          left: '44.75%',
          top: '45.25%',
        }}
        className="absolute rounded-3xl"
      />
      

            {/* Smaller Image */}
            <Image
                id="clickexpand"
                src={characters[0]?.ascendancies.image || "/ascendancy/acolyte1.webp"} // Replace with the actual smaller image path
                alt="Ascendancy"
                
                width={SMALL_IMAGE_SIZE}
                height={SMALL_IMAGE_SIZE}
               
                
                className="absolute cursor-pointer"
                style={{
                    top: '50%',
                    left: '50%',
                    marginLeft: ml,
                    marginTop: mt,
                }}
            />
        </div>
    );
};

// Memoize the component to avoid unnecessary re-renders
export const SkillTreeImage = React.memo(SkillTreeImageComponent);

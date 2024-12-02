import Image from "next/image";

export const SkillTreeImage = () => {
    const IMAGE_WIDTH = 2750; // Python script's processed image width
    const IMAGE_HEIGHT = 2864; // Python script's processed image height

    return (
        <Image
        id="image-container"
        src="/skill-tree3.png" // Ensure this is the same file used in Python
        alt="Skill Tree"
        width={IMAGE_WIDTH}
        height={IMAGE_HEIGHT}
        className="relative z-1 select-none" // Background with lower z-index
      />
    )
}
import Link from "next/link";
import { SparklesCore } from "../components/ui/sparkles";
import React from "react";
import { NavigationMenuDemo } from "./NavigationMenu";

interface Props {
  title?: string;
  subtitle?: string;
  notMainPage?: boolean
}

const Header = ({
  title = "Path of Exile 2",
  subtitle = "Overlords",
}: Props) => {

  const isMainPage = true;
  return (
    <div className="container mx-auto px-4 pt-8">
     <NavigationMenuDemo />
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
          {title}
          <span className="block md:text-2xl text-blue-400 mt-2 tracking-[4px]">
            {subtitle}
          </span>
        </h1>
        <div className="justify-center flex mt-4">
          <div className="w-[40rem] h-[5rem] relative bg-transparent">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Updated Sparkles */}
            <SparklesCore
              background="transparent"
              minSize={0.6}
              maxSize={1.2}
              particleDensity={500}
              particleColor={["#FFFFFF", "#80D0FF", "#6A5ACD"]}
              className="w-full h-full pulse-star"
              particleGlow={{
                enable: true,
                color: "#FFD700", // Golden glow
                blur: 20, // Increased blur for stronger glow
              }}
            />
            {/* Radial Gradient */}
            <div
              className="absolute inset-0 w-full h-full bg-transparent 
    [mask-image:radial-gradient(circle at center, rgba(255, 255, 255, 0.4) 20%, transparent 60%)]"
            ></div>
          </div>
        </div>
      </header>
      {!isMainPage && <Link href={'./'}>Go Home</Link>}
    </div>
  );
};
export default React.memo(Header, (prevProps, nextProps) => {
    return (
      prevProps.title === nextProps.title &&
      prevProps.subtitle === nextProps.subtitle &&
      prevProps.notMainPage === nextProps.notMainPage
    );
  });
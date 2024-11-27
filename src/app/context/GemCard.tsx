"use client"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { AnimatePresence, motion } from "framer-motion";
import "@google/model-viewer";
import { CustomToolTip } from "../../components/ui/customToolTip.";

export interface Gem {
  name: string;
  properties: string[];
  requirements: string[];
  description: string;
  explicit_mods: string[];
  tags: string[];
}

const GemCard = ({
  name,
  properties,
  requirements,
  description,
  explicit_mods,
  showFullDescription,
}: Gem & { showFullDescription: boolean }) => {
  const isFire = properties[0]
    .split(",")
    .map((s) => s.trim())
    .includes("Fire");
  const isCold = properties[0]
    .split(",")
    .map((s) => s.trim())
    .includes("Cold");
  const isLightning = properties[0]
    .split(",")
    .map((s) => s.trim())
    .includes("Lightning");
  const isChaos = properties[0]
    .split(",")
    .map((s) => s.trim())
    .includes("Chaos");

  return (
    <Card
      className={`${"bg-[#1a1a1a]"} border-none text-white w-full max-w-md rounded-lg shadow-lg`}
    >
      {/* Card Header */}
      <CardHeader className={`border-b border-[#333333] px-6 py-4`}>
        <div className="flex items-center space-x-4 w-full">
          <model-viewer
            src="./skillgem-uncut.glb"
            alt="A 3D model"
            id="model"
            auto-rotate
            rotation-per-second="15deg"
            camera-controls
            ui-visibility="hidden"
            interaction-prompt="none"
            loading="lazy"
            min-camera-orbit="auto auto 5m"
            max-camera-orbit="auto auto 5m"
            exposure="1"
            style={{
              width: "30px", // Increase size for better visibility
              height: "30px",
              cursor: "pointer", // Change cursor when hovering
              margin: "5px 0 0 0",
            }}
            interaction-policy="none" // Disable the hand cursor and UI interaction
          ></model-viewer>
          <CustomToolTip text={name}>
          <CardTitle
            className={`text-2xl font-bold 
  ${
    isFire
      ? "text-[#FF5733]"
      : isCold
      ? "text-[#00B0FF]"
      : isLightning
      ? "text-[#FFEB3B]"
      : isChaos
      ? "text-[#9C27B0]"
      : "text-[#66aa99]"
  } truncate`}
          >
            {name}
          </CardTitle>
          </CustomToolTip>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="px-6 py-4 space-y-4">
        {/* Use AnimatePresence only for the description part */}
        <AnimatePresence>
          {showFullDescription && (
            <motion.div
              initial={{ opacity: 0, maxHeight: 0 }} // Start with collapsed state
              animate={{
                opacity: 1,
                maxHeight: showFullDescription ? 1000 : 0, // Expand or collapse the description
              }}
              exit={{
                opacity: 0,
                maxHeight: 0,
                transition: { duration: 0.25, ease: "easeInOut" },
              }}
              transition={{
                opacity: { duration: 0.25 }, // Smooth fade transition
                maxHeight: { duration: 0.25, ease: "easeInOut" }, // Smooth maxHeight transition
              }}
              className="overflow-hidden" // Hide overflow content during collapsing
            >
              {/* Render content when the description is expanded */}
              <div className="space-y-2">
                {properties.map((prop, index) => (
                  <p key={index} className="text-sm text-[#b3b3b3]">
                    {prop}
                  </p>
                ))}
              </div>

              <div className="space-y-2">
                {requirements.map((req, index) => (
                  <p key={index} className="text-[#8888ff]">
                    {req}
                  </p>
                ))}
              </div>

              <p className="text-[#a19f9f] italic">{description}</p>

              <div className="space-y-2">
                {explicit_mods.map((mod, index) => (
                  <p key={index} className="text-[#8888ff]">
                    {mod}
                  </p>
                ))}
              </div>

              <p className="text-gray-500 text-sm mt-4">
                Skills can be Managed in the Skills Panel
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export default GemCard;

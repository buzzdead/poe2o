"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatePresence, motion } from "framer-motion"
import "@google/model-viewer";
import { CustomToolTip } from "../../components/ui/customToolTip."

export interface Gem {
  name: string
  properties: string[]
  requirements: string[]
  description: string
  explicit_mods: string[]
  tags: string[]
}

type ElementType = 'Fire' | 'Cold' | 'Lightning' | 'Chaos'

const elementTypes: Record<ElementType, string> = {
  Fire: "text-accent-fire skill-effect-fire",
  Cold: "text-accent-cold skill-effect-cold",
  Lightning: "text-accent-lightning skill-effect-lightning",
  Chaos: "text-accent-chaos skill-effect-chaos",
} as const

const GemCard = ({
  name,
  properties,
  requirements,
  description,
  explicit_mods,
  showFullDescription,
}: Gem & { showFullDescription: boolean }) => {
  const getElementType = (props: string): ElementType | null => {
    const elements = Object.keys(elementTypes) as ElementType[]
    return elements.find(element => props.includes(element)) || null
  }

  const elementType = getElementType(properties[0])
  const textColor = elementType ? elementTypes[elementType] : "text-[#66aa99]"

  return (
    <Card className="bg-[#1a1a1a] border-none text-white w-full max-w-md rounded-lg shadow-lg transition-shadow hover:shadow-xl">
      {/* Card Header */}
      <CardHeader className="border-b border-[#333333] px-6 py-4 space-y-0">
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <model-viewer
              src="./skillgem-uncut.glb"
              alt="Skill gem 3D model"
              auto-rotate
              rotation-per-second="15deg"
              camera-controls
              ui-visibility="hidden"
              interaction-prompt="none"
              loading="lazy"
              min-camera-orbit="auto auto 5m"
              max-camera-orbit="auto auto 5m"
              exposure="1"
              id="model"
              style={{
                width: "40px",
                height: "40px",
                cursor: "default",
              }}
              interaction-policy="none"
            />
          </div>
          <CustomToolTip text={name}>
            <CardTitle className={`${textColor} text-2xl font-bold tracking-tight truncate`}>
              {name}
            </CardTitle>
          </CustomToolTip>
        </div>
      </CardHeader>

      {/* Card Content */}
      <CardContent className="p-6">
        <AnimatePresence>
          {showFullDescription && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="space-y-6"
            >
              {/* Properties Section */}
              <div className="space-y-2">
                {properties.map((prop, index) => (
                  <p key={index} className="text-[#b3b3b3] text-sm leading-relaxed">
                    {prop}
                  </p>
                ))}
              </div>

              {/* Requirements Section */}
              <div className="space-y-2">
                {requirements.map((req, index) => (
                  <p key={index} className="text-[#8888ff] font-medium text-sm">
                    {req}
                  </p>
                ))}
              </div>

              {/* Description */}
              <p className="text-[#a19f9f] italic text-sm leading-relaxed">
                {description}
              </p>

              {/* Explicit Mods */}
              <div className="space-y-2">
                {explicit_mods.map((mod, index) => (
                  <p key={index} className="text-[#8888ff] font-medium text-sm leading-relaxed">
                    {mod}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  )
}

export default GemCard


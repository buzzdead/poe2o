"use client"
import { useState } from 'react';
import { GuideList } from "./guidelist";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../../components/ui/carousel';
import { Card } from '../../components/ui/card';

interface GuideProps {
    ascendancy: keyof typeof GuideList;
}

type Image = { name: string; src: string };

const Guides = () => {
    const images: Image[] = [
      { name: "Acolyte", src: "/ascendancy/acolyte.webp" },
      { name: "Bloodmage", src: "/ascendancy/bloodmage.webp" },
      { name: "Chronomancer", src: "/ascendancy/chronomancer.webp" },
      { name: "Deadeye", src: "/ascendancy/deadeye.webp" },
      { name: "Infernalist", src: "/ascendancy/infernalist.webp" },
      { name: "Invoker", src: "/ascendancy/invoker.webp" },
      { name: "Legionnaire", src: "/ascendancy/legionnaire.webp" },
      { name: "Pathfinder", src: "/ascendancy/pathfinder.webp" },
      { name: "Stormweaver", src: "/ascendancy/stormweaver.webp" },
      { name: "Titan", src: "/ascendancy/titan.webp" },
      { name: "Warbringer", src: "/ascendancy/warbringer.webp" },
      { name: "Witchhunter", src: "/ascendancy/witchhunter.webp" },
    ];
  
    const [selectedAscendancy, setSelectedAscendancy] = useState<keyof typeof GuideList>("infernalist");
  
    return (
      <div className="flex justify-center items-center w-full h-full p-4 bg-background">
        <div className="w-full max-w-4xl bg-background/80 p-6 rounded-lg shadow-lg backdrop-blur-md">
          <div className="text-3xl font-extrabold font-sans bg-clip-text text-blue-800 text-center pb-6">
            Ascendancy Guides
          </div>
          <Carousel
            opts={{ dragFree: true, dragThreshold: 20 }}
            className="w-full mb-8"
          >
            <CarouselContent>
              {images.map((img, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1">
                    <Card
                      className="cursor-pointer transition-all hover:scale-105"
                      onClick={() => setSelectedAscendancy(img.name.toLowerCase() as keyof typeof GuideList)}
                    >
                      <div className="flex aspect-square items-center justify-center p-6 relative">
                        <img
                          src={img.src}
                          alt={img.name}
                          className="absolute inset-0 w-full h-full object-cover select-none"
                        />
                        <h3
                          className={`text-lg font-semibold absolute bottom-1 left-1 bg-black/50 px-2 py-2 rounded select-none ${
                            img.name === selectedAscendancy ? 'text-blue-600' : 'text-white'
                          }`}
                        >
                          {img.name}
                        </h3>
                      </div>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
  
          <Guide ascendancy={selectedAscendancy} />
        </div>
      </div>
    );
  };

const Guide = ({ ascendancy }: GuideProps) => {
    const myGuide = GuideList[ascendancy];

    return (
        <div className="space-y-8">
            <div>
                <h3 className="text-2xl font-semibold text-accent-fire border-b-2 border-blue-800 pb-2 mb-4">Early Focus</h3>
                <ul className="space-y-6">
                    {myGuide.earlyFocus.map((item, index) => (
                        <li key={index} className="flex flex-col space-y-3">
                            <span className="text-xl font-bold text-accent">{item.bulletPoint}</span>
                            <p className="text-base text-gray-300">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-accent-fire border-b-2 border-blue-800 pb-2 mb-4">Core Skills</h3>
                <ul className="space-y-6">
                    {myGuide.coreSkills.map((item, index) => (
                        <li key={index} className="flex flex-col space-y-3">
                            <span className="text-xl font-bold text-accent">{item.bulletPoint}</span>
                            <p className="text-base text-gray-300">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-accent-fire border-b-2 border-blue-800 pb-2 mb-4">Key Nodes</h3>
                <ul className="space-y-6">
                    {myGuide.keyNodes.map((item, index) => (
                        <li key={index} className="flex flex-col space-y-3">
                            <span className="text-xl font-bold text-accent">{item.bulletPoint}</span>
                            <p className="text-base text-gray-300">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div>
                <h3 className="text-2xl font-semibold text-accent-fire border-b-2 border-blue-800 pb-2 mb-4">Ascendancy</h3>
                <ul className="space-y-6">
                    {myGuide.ascendancy.map((item, index) => (
                        <li key={index} className="flex flex-col space-y-3">
                            <span className="text-xl font-bold text-accent">{item.bulletPoint}</span>
                            <p className="text-base text-gray-300">{item.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Guides;

"use client"
import dynamic from 'next/dynamic';
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { CustomToggle } from "../CustomToggle";
import { useGems } from "../context/GemsContext";
import React from "react";
import TagSelector from "../../components/ui/TagSelector";
import tags from "../data/tags.json";

const DynamicGemCard = dynamic(() => import("../context/GemCard"), { ssr: false });

const Gems = () => {
  const { page, setPage, displayedGems, allGems, filters, setFilters, tagFilters, toggleTagFilter } = useGems();
  const [showFullDescription, setShowFullDescription] = useState(true);

  const gemsPerPage = 20;
  const hasMore = page * gemsPerPage < allGems;

  const loadMoreGems = () => {
    setPage(page + 1);
  };

  return (
    <div className="dark bg-background min-h-screen text-foreground">
      <main className="max-w-4xl mx-auto">
        <div className={'flex gap-2 mb-2'}>
        <CustomToggle
          pressed={showFullDescription}
          onPressedChange={() => setShowFullDescription(!showFullDescription)}
        />
          <CustomToggle 
            text={"Skill gems"} 
            pressed={filters.skillGems}
            onPressedChange={() => setFilters({ skillGems: !filters.skillGems })}
          />
          <CustomToggle 
            text={"Support gems"} 
            pressed={filters.supportGems}
            onPressedChange={() => setFilters({ supportGems: !filters.supportGems })}
          />
          <CustomToggle 
            text={"Spirit gems"} 
            pressed={filters.spiritGems}
            onPressedChange={() => setFilters({ spiritGems: !filters.spiritGems })}
          />
          <TagSelector tags={tags} selectedTags={tagFilters} onSelectTag={toggleTagFilter} onRemoveTag={toggleTagFilter}/>
        </div>
        <InfiniteScroll
          dataLength={displayedGems.length}
          next={loadMoreGems}
          hasMore={hasMore}
          loader={<div className="text-center py-4">Loading more gems...</div>}
          scrollThreshold={0.9}
        >
          <section className="grid md:grid-cols-2 gap-6">
            {displayedGems.map((gem, index) => (
              <DynamicGemCard
                key={`${gem.name}-${index}`}
                showFullDescription={showFullDescription}
                {...gem}
              />
            ))}
          </section>
        </InfiniteScroll>
      </main>
    </div>
  );
};

export default Gems;

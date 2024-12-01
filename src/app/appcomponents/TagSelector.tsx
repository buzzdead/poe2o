import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";

interface Props {
    tags: string[]
    selectedTags: string[]
    onSelectTag: (s: string) => void
    onRemoveTag: (s: string) => void
}

const TagSelector = ({ tags, selectedTags, onSelectTag, onRemoveTag }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-wrap mb-0">
       
      </div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button className="btn btn-primary text-emerald-400 font-bold text-sm hover:bg-emerald-900/80 p-2 rounded-md">Tag filter</button>
        </PopoverTrigger>
        {selectedTags.map((tag: string) => (
          <Badge
            key={tag}
            variant="outline"
            className="cursor-pointer"
            onClick={() => onRemoveTag(tag)}
          >
            {tag} ✕
          </Badge>
        ))}
        <PopoverContent className="w-80 p-2">
          <Command>
            <CommandInput placeholder="Search tags..." />
            <CommandList>
              {tags.map((tag) => (
                <CommandItem
                  key={tag}
                  onSelect={() => {
                    onSelectTag(tag);
                    setIsOpen(false);
                  }}
                >
                  {tag}
                </CommandItem>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TagSelector;

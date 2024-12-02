export type Char = { name: string; image: string; info: string };
export type Skill = {
    name: string;
    effect: string;
    prerequisite?: string;
    modifier?: string;
};

export type Ascendancy = {
    name: string;
    image: string
    nodes: Skill[];
};
export type ClassesWithAscendancy = {
    name: string
    ascendancies: Ascendancy[]
}

export type Gem = {
        name: string;
        properties: string[];
        requirements: string[];
        description: string;
        explicit_mods: string[];
        tags: string[];
    } | {
        name: string;
        properties: string[];
        requirements: string[];
        description: null;
        explicit_mods: string[];
        tags: string[];
    
}
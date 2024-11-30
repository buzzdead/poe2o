export type Char = { name: string; image: string; info: string };
export type Skill = {
    name: string;
    effect: string;
    prerequisite?: string;
    modifier?: string;
};

export type Ascendancy = {
    name: string;
    nodes: Skill[];
};
export type ClassesWithAscendancy = {
    name: string
    ascendancies: Ascendancy[]
}
export interface SkillNode {
  id: string;
  name: string;
  x: number;
  y: number;
  stats: string[];
}

export interface NodeStyleOptions {
  highLight?: boolean;
  border: string;
  background: string;
}

export const calculateNodeStyle = (
  node: SkillNode,
  isSelected: boolean,
  filterNodes: string[],
  searchQuery: string,
  size: string,
  ColorsFromSize: {
    selected: Record<string, string>;
    unSelected: Record<string, string>;
  },
  highlightCache: { [key: string]: boolean } // Add a cache for highlight status
): NodeStyleOptions => {
  // Use the cache to avoid redundant calculations
  const highLight = highlightCache[node.id] ?? 
    (filterNodes.includes(node.name) ||
    (searchQuery.trim() !== "" &&
      node.stats.some((stat) =>
        stat.toLowerCase().includes(searchQuery.toLowerCase())
      )));

  // Store the highlight status in the cache for future use
  highlightCache[node.id] = highLight;

  // Compute the styles
  const borderColor = isSelected
    ? ColorsFromSize.selected[size]
    : highLight
    ? ColorsFromSize.selected[size]
    : ColorsFromSize.unSelected[size];

  const backgroundColor = isSelected
    ? ColorsFromSize.selected[size]
    : ColorsFromSize.unSelected[size];

  return {
    highLight,
    border: `2px solid ${borderColor}`,
    background: backgroundColor,
  };
};

export const precomputeHighlights = (
  nodes: SkillNode[],
  filterNodes: string[],
  searchQuery: string
): { [key: string]: boolean } => {
  const highlightCache: { [key: string]: boolean } = {};

  for (const node of nodes) {
    highlightCache[node.id] =
      filterNodes.includes(node.name) ||
      (searchQuery.trim() !== "" &&
        node.stats.some((stat) =>
          stat.toLowerCase().includes(searchQuery.toLowerCase())
        ));
  }

  return highlightCache;
};

export const calculateDistance = (
  node1: { x: number; y: number },
  node2: { x: number; y: number }
): number => {
  // Scale the x and y coordinates by 100
  const x1 = node1.x * 100;
  const y1 = node1.y * 100;
  const x2 = node2.x * 100;
  const y2 = node2.y * 100;

  // Calculate the Euclidean distance between the two nodes
  const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));

  return distance;
};

export const calculateDistanceToCenter = (node: SkillNode) => {
  const centerX = 0.5;
  const centerY = 0.5;
  return Math.sqrt(
    Math.pow(node.x - centerX, 2) + Math.pow(node.y - centerY, 2)
  );
};
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
  }
): NodeStyleOptions => {
  const nodeStyle =
    node.stats.length > 0
      ? {
          highLight:
            filterNodes.includes(node.name) ||
            (searchQuery.trim() !== "" &&
              node.stats.some((stat) =>
                stat.toLowerCase().includes(searchQuery.toLowerCase())
              )),
          border: isSelected
            ? `2px solid ${ColorsFromSize.selected[size]}`
            : filterNodes.includes(node.name) ||
              (searchQuery.trim() !== "" &&
                node.stats.some((stat) =>
                  stat.toLowerCase().includes(searchQuery.toLowerCase())
                ))
            ? `2px solid ${ColorsFromSize.selected[size]}`
            :  `2px solid ${ColorsFromSize.unSelected[size]}`,
          background: isSelected ? ColorsFromSize.selected[size] :  ColorsFromSize.unSelected[size],
        }
      : {
          border: isSelected
            ? `2px solid ${ColorsFromSize.selected[size]}`
            : "2px solid rgba(37, 99, 235, 0.15)", // blue-600
          background: isSelected ? ColorsFromSize.selected[size] : "rgba(204, 204, 255, .41)",
        };
  return nodeStyle;
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
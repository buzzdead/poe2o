import { useCharacterContext } from "../context/CharContext";
import { calculateDistance, calculateDistanceToCenter, SkillNode } from "../skilltree/myUtils";
import filterNodesData from "../data/combined_filtered_nodes.json";

export const useNodeSelector = () => {
  const { addNode, removeNode, isNodeSelected, nodes } = useCharacterContext();

  const handleSelectNode = (node: SkillNode, isCtrlDown: boolean, isLeftShiftSelected: boolean) => {
    const isSelected = isNodeSelected(node.id)
    const distanceThreshold = 10;

    if (isSelected) {
      if (isLeftShiftSelected) {
        // Deselect all nodes with the same name
        const nodesToRemove = nodes.filter((n) => n.name === node.name);
        nodesToRemove.forEach(removeNode);
      } else {
        removeNode(node); // Remove only the clicked node
      }
    } else {
      if (isLeftShiftSelected) {
        // Select all nearby nodes with the same name
        let nearbyNodes = filterNodesData.nodes.filter(
          (sn) => sn.name === node.name && calculateDistance(node, sn) <= distanceThreshold
        );

        if (node.name === "Attribute") {
          nearbyNodes = nearbyNodes.filter(
            (sn) => calculateDistanceToCenter(sn) <= calculateDistanceToCenter(node)
          );
        }

        // Add only nodes that are not already in the current selection
        nearbyNodes = nearbyNodes.filter(
          (sn) => !nodes.some((existingNode) => existingNode.id === sn.id)
        );

        if (nearbyNodes.length > 0) {
          nearbyNodes.forEach(addNode); // Add nearby nodes
        }
      } else {
        addNode(node); // Add only the clicked node
      }
    }
  };

  return { handleSelectNode };
};

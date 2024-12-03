import { useCharacterContext } from "../context/CharContext"
import { SkillTreeNodes } from "./SkillTreeNodes";
import newNodes from "../data/file1_updated.json";
interface Props {
    filterNodes: string[];
    searchQuery: string;
    zoomRef: any;
  }
export const Ascendancies = ({filterNodes, searchQuery, zoomRef}: Props) => {
    const { characters } = useCharacterContext()
    return <SkillTreeNodes size="16px" searchQuery={searchQuery} filterNodes={filterNodes} nodes={newNodes?.asc?.filter(an => an.class === characters[0]?.ascendancies?.name?.toLowerCase())} zoomRef={zoomRef}/>
}
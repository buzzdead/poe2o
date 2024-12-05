import Image from "next/image";
import { useCharacterContext } from "../context/CharContext";

interface Props {
  imgSize: number;
  ml: string;
  mt: string;
}

export const AscImage = ({ imgSize, ml, mt }: Props) => {
  const { characters } = useCharacterContext();
  return (
    <Image
      id="clickexpand"
      src={characters[0]?.ascendancies.image || "/ascendancy/acolyte1.webp"} // Replace with the actual smaller image path
      alt="Ascendancy"
      priority
      width={imgSize}
      height={imgSize}
      className="absolute cursor-pointer"
      style={{
        top: "50%",
        left: "50%",
        marginLeft: ml,
        marginTop: mt,
      }}
    />
  );
};

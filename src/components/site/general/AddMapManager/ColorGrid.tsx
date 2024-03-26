import { useMapStore } from "@/store/maps";
import React from "react";

interface ColorGridProps {}

const colorGrid: string[] = [
  "#FF5733",
  "#FFBD33",
  "#337AFF",
  "#8C33FF",
  "#FFA933",
  "#D44126",
  "#B68824",
  "#2E8058",
  "#1C4A7A",
  "#5B1C71",
  "#D92ABD",
  "#1C1C71",
  "#1C887A",
  "#74991C",
];

const ColorGrid: React.FC<ColorGridProps> = () => {
  const { selectedColor, setSelectedColor } = useMapStore();

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="mt-4">
      <h2 className="mb-2">Choisissez une couleur:</h2>
      <div className="flex flex-wrap">
        {colorGrid.map((color, index) => (
          <div
            key={index}
            className={`w-10 h-10 rounded-full m-1 cursor-pointer transition-all transform hover:scale-110 ${
              color === selectedColor ? "border-[0.3rem] border-slate-200" : ""
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      <p className="mt-2">Code HEX: {selectedColor}</p>
    </div>
  );
};

export default ColorGrid;

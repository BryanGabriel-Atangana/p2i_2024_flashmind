import React, { useState } from "react";

interface ColorGridProps {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
}

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

const ColorGrid: React.FC<ColorGridProps> = ({
  selectedColor,
  setSelectedColor,
}) => {
  const handleColorClick = (color: string): void => {
    setSelectedColor(color);
  };

  return (
    <div className="px-4 ">
      <h2>Select a color:</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {colorGrid.map((color, index) => (
          <div
            key={index}
            style={{
              backgroundColor: color,
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              margin: "5px",
              cursor: "pointer",
              border: color === selectedColor ? "2px solid slate" : "none",
            }}
            onClick={() => handleColorClick(color)}
          ></div>
        ))}
      </div>
      <p>Selected Color: {selectedColor}</p>
    </div>
  );
};

export default ColorGrid;

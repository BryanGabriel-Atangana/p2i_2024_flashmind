import React from "react";

interface Map {
  id: string;
  title: string;
  color: string;
}

interface MapCardProps {
  map: Map;
}

const MapCard: React.FC<MapCardProps> = ({ map }) => {
  // Render the map card using the 'map' prop
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1">
      <div className="h-[4rem] rounded-md bg-[#f2f2f2]">
        <div>
          <div className="flex justify-between items-center h-full px-2 pt-2">
            <div className="flex items-center gap-2">
              <div
                style={{ backgroundColor: map.color }}
                className="h-4 w-4 rounded-full"
              ></div>
              <span className="text-[#131135]">{map.title}</span>
            </div>
            <div>
              {/* Assuming MapMenu component is defined elsewhere */}
              Menu
            </div>
          </div>
          <div className="text-[#333333] text-[0.8rem] px-2">X cartes</div>
        </div>
      </div>
    </div>
  );
};

export default MapCard;

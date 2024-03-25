"use client";
// Import necessary modules and types
import React, { useEffect, useState } from "react";
import { getMaps } from "@/actions/getMaps";
import { MapMenu } from "./MapMenu";
import { AddMap } from "./AddMapCard";

// Define the component
const MapCard = () => {
  // Define state variables to store map data and loading/error status
  const [maps, setMaps] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchMaps = async () => {
    try {
      const mapData = await getMaps();

      if (mapData.error) {
        setError(mapData.error);
      } else {
        setMaps(mapData.maps!);
      }
    } catch (error) {
      console.error("An error occurred while fetching maps:", error);
      setError("An error occurred while fetching maps");
    }
  };

  // Fetch maps initially and set up polling to fetch maps periodically
  useEffect(() => {
    const intervalId = setInterval(fetchMaps, 3000); // Fetch every 5 seconds
    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  // Display error message if fetching failed
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display the list of maps
  return (
    <div className="flex flex-wrap pt-2">
      {maps.map((map, index) => (
        <div
          key={index}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1"
        >
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
                  <MapMenu />
                </div>
              </div>
              <div className="text-[#333333] text-[0.8rem] px-2">X cartes</div>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1">
        <AddMap />
      </div>
    </div>
  );
};

// Export the component
export default MapCard;

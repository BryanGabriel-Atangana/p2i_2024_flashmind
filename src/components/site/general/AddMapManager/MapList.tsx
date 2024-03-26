"use client";
import { useEffect } from "react";
import { useMapStore } from "@/store/maps";

import { AddMap } from "./AddMapCard";
import MapCard from "./MapCard";

const MapList = () => {
  const maps = useMapStore((state) => state.maps);
  const fetchMaps = useMapStore((state) => state.fetchMaps);

  useEffect(() => {
    fetchMaps();
  }, [fetchMaps]);

  return (
    <div className="pt-2">
      <div className="flex flex-wrap">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-1">
          <AddMap />
        </div>
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
    </div>
  );
};

export default MapList;

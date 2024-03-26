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
    <div>
      <div>
        {maps.map((map) => (
          <MapCard key={map.id} map={map} />
        ))}
      </div>
      <AddMap />
    </div>
  );
};

export default MapList;

// store/maps.ts
import { create } from "zustand";
import { getMaps } from "@/actions/getMaps";
import { addMap } from "@/actions/addMap";

type Map = {
  id: string;
  title: string;
  color: string;
};

type MapStore = {
  maps: Map[];
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  fetchMaps: () => Promise<void>;
  mapList: (title: string, color: string) => Promise<void>;
};

export const useMapStore = create<MapStore>((set) => ({
  maps: [],
  selectedColor: "#FF5733",
  setSelectedColor: (color: string) => set({ selectedColor: color }),
  fetchMaps: async () => {
    try {
      const { error, maps } = await getMaps();
      if (error) {
        console.error("Error fetching maps:", error);
      } else {
        set({ maps });
      }
    } catch (error) {
      console.error("Error fetching maps:", error);
    }
  },

  mapList: async (title, color) => {
    try {
      const result = await addMap({ title, color });
      if ("error" in result) {
        console.error("Error adding map:", result.error);
      } else {
        set((state) => ({ maps: [...state.maps, result] }));
      }
    } catch (error) {
      console.error("Error adding map:", error);
    }
  },
}));

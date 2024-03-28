import { create } from "zustand";

type CardCountStore = {
  cardCount: number | undefined;
  setCardCount: (count: number | undefined) => void; // Function to update the card count
};

// Create the store
export const useCardCountStore = create<CardCountStore>((set) => ({
  cardCount: undefined,
  setCardCount: (count) => set({ cardCount: count }),
}));

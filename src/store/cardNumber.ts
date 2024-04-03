import { create } from "zustand";

type CardCountStore = {
  cardCount: number | undefined;
  setCardCount: (count: number | undefined) => void; // Function to update the card count
};

/**
 * Crée le store pour le comptage de cartes.
 * @param {Function} set - Fonction de mise à jour interne de Zustand.
 * @returns {CardCountStore} - Le store pour le comptage de cartes.
 */
export const useCardCountStore = create<CardCountStore>((set) => ({
  cardCount: undefined,
  setCardCount: (count) => set({ cardCount: count }),
}));

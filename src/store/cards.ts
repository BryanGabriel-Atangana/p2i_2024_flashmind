import { create } from "zustand";
import { getCards } from "@/actions/getCards";
import { addCard as addCardAPI } from "@/actions/addCard";

type Map = {
  id: string;
  title: string;
  color: string;
  userId: string;
};

type Card = {
  id: string;
  question: string;
  answer: string;
  mapId: string;
};

type CardStore = {
  answer: string;
  setAnswer: (answer: string) => void;
  cards: Card[];
  fetchCards: (map: Map) => Promise<void>;
  cardList: (values: Card) => Promise<void>;
};

export const useCardStore = create<CardStore>((set) => ({
  answer: "",
  setAnswer: (answer: string) => set({ answer: answer }),
  cards: [],
  fetchCards: async (map) => {
    try {
      const { error, cards } = await getCards(map);
      if (error) {
        console.error("Error fetching cards:", error);
      } else {
        set({ cards });
      }
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  },
  cardList: async (values) => {
    try {
      const newCard = await addCardAPI(values);
      set((state) => ({
        cards: [...state.cards, newCard] as Card[],
      }));
    } catch (error) {
      console.error("Error adding card:", error);
    }
  },
}));

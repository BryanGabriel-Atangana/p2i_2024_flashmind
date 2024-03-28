import { db } from "@/lib/db";

export const getCurrentMap = async (id: string) => {
  try {
    const map = await db.map.findUnique({
      where: {
        id: id,
      },
    });
    return map;
  } catch (error) {
    return { error: "Couldn't find the map" };
  }
};

export const getNumberOfCards = async (id: string) => {
  try {
    const numberOfCards = await db.card.count({ where: { mapId: id } });
    return numberOfCards;
  } catch {
    return;
  }
};

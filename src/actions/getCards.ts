"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";
type Map = {
  id: string;
  title: string;
  color: string;
};
export const getCards = async (map: Map) => {
  const session = await auth();
  if (!session) {
    return { error: "Aucune session active!" };
  }
  try {
    const cards = await db.card.findMany({
      where: {
        mapId: map.id,
      },
    });
    return { cards };
  } catch (err) {
    return { error: err };
  }
};

export const getCardsCount = async (map: Map) => {
  const session = await auth();
  if (!session) {
    return { error: "Aucune session active!" };
  }
  try {
    const cardsCount = await db.card.count({
      where: {
        mapId: map.id,
      },
    });
    return { count: cardsCount };
  } catch (err) {
    return { error: err };
  }
};

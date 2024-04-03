"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";

type Map = {
  id: string;
  title: string;
  color: string;
};

/**
 * Fonction pour obtenir les cartes associées à une carte mentale spécifique.
 * @param {Map} map - La carte mentale pour laquelle obtenir les cartes.
 * @returns {Object} - Les cartes associées à la carte mentale ou un objet d'erreur.
 */
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

/**
 * Fonction pour obtenir le nombre de cartes associées à une carte mentale spécifique.
 * @param {Map} map - La carte mentale pour laquelle obtenir le nombre de cartes.
 * @returns {Object} - Le nombre de cartes associées à la carte mentale ou un objet d'erreur.
 */
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

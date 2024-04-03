import { db } from "@/lib/db";

/**
 * Fonction pour obtenir les informations de la carte mentale actuelle.
 * @param {string} id - L'identifiant de la carte mentale.
 * @returns {Object} - Les informations de la carte mentale ou un objet d'erreur.
 */
export const getCurrentMap = async (id: string) => {
  try {
    // Recherche de la carte mentale dans la base de données
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

/**
 * Fonction pour obtenir le nombre de cartes associées à une carte mentale.
 * @param {string} id - L'identifiant de la carte mentale.
 * @returns {number | undefined} - Le nombre de cartes associées à la carte mentale ou undefined en cas d'erreur.
 */
export const getNumberOfCards = async (id: string) => {
  try {
    const numberOfCards = await db.card.count({ where: { mapId: id } });
    return numberOfCards;
  } catch {
    return;
  }
};

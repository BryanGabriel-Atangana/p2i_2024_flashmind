/**
 * Action de récupération des maps de l'utilisateur
 * Ce fichier contient la fonction pour récupérer les maps associées à l'utilisateur actuellement authentifié
 * @module action/getMap
 */

"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";

/**
 * Fonction de récupération des maps de l'utilisateur
 * @function
 * @returns {Object} - Les maps de l'utilisateur ou un message d'erreur si l'opération échoue
 */
export const getMaps = async () => {
  const session = await auth();
  if (!session) {
    return { error: "Error" };
  }
  try {
    const userId: string = session!.user!.id!; // Asserting non-null
    const maps = await db.map.findMany({
      where: {
        userId: userId,
      },
    });

    return { maps };
  } catch {
    return { error: "Une erreur est survenue" };
  }
};

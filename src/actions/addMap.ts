/**
 * Action d'ajout de carte
 * Ce fichier contient la fonction pour ajouter une nouvelle map à l'utilisateur actuellement authentifié
 * @module action/addMap
 */

"use server";
import { db } from "@/lib/db";
import { MapSchema } from "@/schema";
import * as z from "zod";
import { auth } from "../../auth";

/**
 * Fonction d'ajout de cartes mentales
 * @function
 * @param {Object} values - Informations de la map à ajouter
 * @returns {Object} - Résultat de l'opération (succès ou erreur)
 */
export const addMap = async (values: z.infer<typeof MapSchema>) => {
  const session = await auth();
  const validatedFields = MapSchema.parse(values);
  if (!validatedFields) {
    return { error: "Champs invalides" };
  }
  try {
    const userId: string | undefined = session?.user.id;
    const createdMap = await db.map.create({
      data: {
        title: validatedFields.title,
        color: validatedFields.color,
        userId: userId!,
      },
    });
    return createdMap;
  } catch (e) {
    console.error(e);
    return { error: "Une erreure est survenue" };
  }
};

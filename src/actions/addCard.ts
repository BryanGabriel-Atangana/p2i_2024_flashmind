/**
 * Ajoute une carte à une map dans la base de données.
 * @param values Les valeurs de la carte à ajouter.
 * @returns La carte ajoutée ou un objet d'erreur si une erreur se produit.
 */

"use server";
import { db } from "@/lib/db";
import * as z from "zod";
import { auth } from "../../auth";
import { CardSchema } from "@/schema";

export const addCard = async (values: z.infer<typeof CardSchema>) => {
  const session = await auth();

  // Validation des champs de la carte
  const validatedFields = CardSchema.parse(values);
  if (!validatedFields) {
    return { error: "Champs invalides" };
  }
  try {
    // Vérification des autorisations de l'utilisateur
    if (!session) return { error: "vous n'avez pas le droit à cette action" };
    const userId = session.user.id;

    // Recherche de la map associée à la carte
    const map = await db.map.findFirst({
      where: {
        id: values.mapId,
      },
    });

    if (!map) {
      return { error: "Map introuvable" };
    }
    if (map?.userId !== userId)
      return { error: "Vous ne pouvez pas créer cette carte" };

    // Création de la carte dans la base de données
    const createCard = await db.card.create({
      data: {
        mapId: map.id,
        answer: validatedFields.answer,
        question: validatedFields.question,
      },
    });
    return createCard;
  } catch (e) {
    return { error: "Une erreur s'est produite lors de l'ajout de la carte" };
  }
};

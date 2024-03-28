"use server";
import { db } from "@/lib/db";
import * as z from "zod";
import { auth } from "../../auth";
import { CardSchema } from "@/schema";

export const addCard = async (values: z.infer<typeof CardSchema>) => {
  const session = await auth();
  const validatedFields = CardSchema.parse(values);
  if (!validatedFields) {
    return { error: "Champs invalides" };
  }
  try {
    if (!session) return { error: "vous n'avez pas le droit à cette action" };
    const userId = session.user.id;
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

"use server";
import { db } from "@/lib/db";
import { MapSchema } from "@/schema";
import * as z from "zod";
import { auth } from "../../auth";

export const addMap = async (values: z.infer<typeof MapSchema>) => {
  const session = await auth();
  const validatedFields = MapSchema.parse(values);
  if (!validatedFields) {
    return { error: "Champs invalides" };
  }
  try {
    const userId: string | undefined = session?.user.id;
    await db.map.create({
      data: {
        title: validatedFields.title,
        color: validatedFields.color,
        userId: userId!,
      },
    });
  } catch {
    return { error: "Une erreure est survenue" };
  }
};

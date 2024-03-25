"use server";
import { db } from "@/lib/db";
import { auth } from "../../auth";

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

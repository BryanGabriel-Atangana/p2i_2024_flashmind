"use server";
import * as z from "zod";
import { SignupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const signup = async (values: z.infer<typeof SignupSchema>) => {
  const validatedFields = SignupSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Erreure de validation" };
  }

  const { email, name, password } = validatedFields.data;

  // sécurisation du mot de pass dans la base de données
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return {
      error: "Cette email existe déja ",
    };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "Tout est bon !" };
};

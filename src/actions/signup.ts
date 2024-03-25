/**
 * Action de création de compte utilisateur
 * Ce fichier contient la fonction pour créer un nouveau compte utilisateur
 * @module action/signup
 */

"use server";

import * as z from "zod";
import { SignupSchema } from "@/schema";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

/**
 * Fonction de création de compte utilisateur
 * @function
 * @param {Object} values - Informations d'inscription
 * @returns {Object} - Résultat de l'opération (succès ou erreur)
 */
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

  // Création d'un nouvel utilisateur dans la base de données
  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  return { success: "Tout est bon !" };
};

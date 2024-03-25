/**
 * Action de connexion utilisateur
 * Ce fichier contient la fonction pour authentifier un utilisateur lors de la connexion
 * @module action/login
 */

"use server";
import * as z from "zod";
import { LoginSchema } from "@/schema";
import { signIn } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { AuthError } from "next-auth";

/**
 * Fonction de connexion utilisateur
 * @function
 * @param {Object} values - Informations de connexion (e-mail et mot de passe)
 * @returns {Object} - Résultat de l'opération (succès ou erreur)
 */
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Erreure de validation" };
  }
  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Identifiants invalides" };
        default:
          return { error: "Il y a un petit problem" };
      }
    }
    throw error;
  }
  return { succes: "Tout est bon !" };
};

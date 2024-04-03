/**
 * Fonction pour vérifier l'authentification de l'utilisateur.
 * @returns {Object} - La session de l'utilisateur ou null en cas d'erreur.
 */

import { auth } from "../auth";

export const checkAuth = async () => {
  try {
    // Récupération de la session de l'utilisateur
    const session = await auth();
    return session;
  } catch (error) {
    console.error("Error fetching session:", error);
    return null;
  }
};

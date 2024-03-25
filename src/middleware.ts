/**
 * Middleware d'authentification
 * Ce middleware gère la sécurité des routes en vérifiant l'état d'authentification de l'utilisateur
 * @module middleware
 */

import authConfig from "../auth.config";
import NextAuth from "next-auth";
import {
  publicRoutes,
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
} from "../routes";
const { auth } = NextAuth(authConfig);

/**
 * Middleware d'authentification
 * @function
 * @param {Object} req - Requête HTTP entrante
 * @returns {Response | undefined} - Réponse de redirection ou undefined si aucune redirection n'est nécessaire
 */
export default auth((req) => {
  const { nextUrl } = req; // URL de la requête
  const isLoggedIn = !!req.auth; // Vérifie si l'utilisateur est connecté
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isApiAuthRoute) return undefined;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return undefined;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return undefined;
});

/**
 * Configuration du middleware
 * @constant
 * @type {Object}
 * @property {string[]} matcher - Liste des chemins sur lesquels le middleware ne doit pas être invoqué
 */
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};

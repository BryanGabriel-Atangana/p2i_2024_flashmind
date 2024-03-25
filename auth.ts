/**
 * Module d'authentification
 * Ce module gère l'authentification des utilisateurs avec NextAuth
 * @module auth
 */

import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "@/lib/db";
import { getUserById } from "@/data/user";
import { UserRole } from "@prisma/client";

/**
 * Configuration et initialisation de NextAuth
 * @constant
 * @type {Object}
 * @property {Object} handlers - Gestionnaires d'actions (GET, POST)
 * @property {Function} auth - Fonction d'authentification
 * @property {Function} signIn - Fonction de connexion
 * @property {Function} signOut - Fonction de déconnexion
 */

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    /**
     * Fonction exécutée lors de la liaison d'un compte
     * Cette fonction met à jour la date de vérification de l'e-mail de l'utilisateur dans la base de données
     * @param {Object} user - Objet contenant les données de l'utilisateur
     */

    async linkAccount({ user }) {
      await db.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    /**
     * Fonction de session
     * Cette fonction modifie la session utilisateur en ajoutant l'identifiant et le rôle de l'utilisateur s'il est présent dans le token
     * @param {Object} param0  - Objet contenant la session et le token
     * @returns {Object} - La session modifiée
     */

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      return session;
    },
    async jwt({ token }) {
      /**
       * Fonction JWT
       * Cette fonction récupère l'utilisateur à partir de son identifiant et ajoute son rôle au token
       * @param {Object} token - Token JWT
       * @returns {Object} - Le token JWT modifié
       */

      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db), // Utilisation de l'adaptateur Prisma pour stocker les sessions
  session: {
    strategy: "jwt",
  },
});

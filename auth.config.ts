/**
 * Configuration de l'authentification
 * Ce fichier contient la configuration des fournisseurs d'authentification pour NextAuth
 * @module auth.config
 */

import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "@/schema";
import { getUserByEmail } from "@/data/user";
import bcrypt from "bcryptjs";

/**
 * Configuration des fournisseurs d'authentification
 * @type {NextAuthConfig}
 */

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          const user = await getUserByEmail(email);
          if (!user || !password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password!);

          if (passwordMatch) return user;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

// Importation du client Prisma
import { PrismaClient } from "@prisma/client";

// Déclaration d'une variable globale pour le client Prisma
declare global {
  var prisma: PrismaClient | undefined;
}
// Déclaration de la variable prisma pour interagir avec la base de données
export const db = globalThis.prisma || new PrismaClient();

// Si l'environnement est en production, une nouvelle instance du client Prisma est créée
// Sinon, si une instance globale du client Prisma n'existe pas encore
if (process.env.NODE_ENV === "production") globalThis.prisma = db;

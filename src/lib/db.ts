// Importation du client Prisma
import { PrismaClient } from "@prisma/client";
import "server-only";

// Déclaration d'une variable globale pour le client Prisma
declare global {
  // eslint-disable-next-line no-var, no-unused-vars
  var cachedPrisma: PrismaClient;
}
// Déclaration de la variable prisma pour interagir avec la base de données
export let prisma: PrismaClient;

// Si l'environnement est en production, une nouvelle instance du client Prisma est créée
// Sinon, si une instance globale du client Prisma n'existe pas encore
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

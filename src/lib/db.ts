/**
 * Module pour la gestion de la base de données avec Prisma
 * Ce fichier définit une instance du client Prisma pour interagir avec la base de données
 * @module lib/db
 */

import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV === "production") globalThis.prisma = db;

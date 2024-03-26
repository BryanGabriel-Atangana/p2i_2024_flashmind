/**
 * Schémas de validation des données
 * Ce fichier définit différents schémas de validation pour les données utilisées dans l'application
 * @module schema/index
 */
import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Entrez une adresse email valide",
  }),
  password: z.string().min(3, {
    message: "Mot de passe valide : 3  caractères minimum",
  }),
});

export const SignupSchema = z.object({
  name: z.string().min(2, {
    message: "Nom valide : 2 caractères minimum ",
  }),
  email: z.string().email({
    message: "Entrez une adresse email valide",
  }),
  password: z.string().min(3, {
    message: "Mot de passe valide : 3  caractères minimum",
  }),
});

export const MapSchema = z.object({
  title: z.string().min(1).max(50, {
    message: "Devrait contenir au moins un caractères",
  }),
  color: z.string().min(7).max(7, {
    message: "Le code couleur devrait être en format HEX",
  }),
});

export const CardSchema = z.object({
  question: z.string().max(100, {
    message: "100 caractères max",
  }),
  answer: z.string().max(4096),
});

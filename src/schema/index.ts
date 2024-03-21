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

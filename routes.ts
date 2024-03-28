/**
 * Un tableau de routes accessibles au public
 * Ces routes ne nécessitent pas d'authentification
 * @type {string[]}
 */
export const publicRoutes = ["/"];

/**
 * Un tableau de routes utilisées pour l'authentification
 * Ces routes redirigeront les utilisateurs connectés vers la page home
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/error", "/home/maps"];

/**
 * Le préfixe pour les routes d'authentification de l'API
 * Les routes commençant par ce préfixe sont utilisées à des fins d'authentification de l'API
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * Le chemin de redirection par défaut après la connexion
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/home";

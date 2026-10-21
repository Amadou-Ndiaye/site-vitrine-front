import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { API_BASE } from '../api/api'; // L'adresse racine de votre API Laravel
import { SessionStore } from '../session/session.store'; // Notre banque centrale de session

// Définition de l'intercepteur sous forme de fonction (Norme moderne d'Angular)
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Injecte le SessionStore pour pouvoir lire le jeton (token)
  const session = inject(SessionStore);

  /**
   * ÉTAPE 1 : FILTRAGE DES REQUÊTES
   * Si la requête HTTP ne commence pas par l'URL de votre API Laravel (par exemple si vous chargez
   * un fichier JSON local ou une icône externe), on ne fait rien et on laisse passer la requête intacte.
   */
  if (!req.url.startsWith(API_BASE + '/')) return next(req);

  // ÉTAPE 2 : PRÉPARATION DES EN-TÊTES DE SÉCURITÉ
  const token = session.token(); // Récupération du jeton actuel depuis le Signal du store

  // On force Laravel à répondre au format JSON (très utile pour éviter de recevoir des pages d'erreur HTML)
  const headers: Record<string, string> = { Accept: 'application/json' };

  // Si un jeton existe (l'utilisateur est connecté), on l'ajoute au format "Bearer" requis par Laravel Sanctum
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  /**
   * ÉTAPE 3 : ENVOI DE LA REQUÊTE ET GESTION DES ERREURS
   * On "clone" la requête originale pour y fusionner nos en-têtes (headers) personnalisés.
   * Ensuite, on écoute la réponse à l'aide de l'opérateur de flux RxJS '.pipe()'.
   */
  return next(req.clone({ setHeaders: headers })).pipe(
    // 'catchError' intercepte la réponse uniquement si le serveur Laravel renvoie un code d'erreur (4xx ou 5xx)
    catchError((error: HttpErrorResponse) => {

      /**
       * ÉTAPE 4 : SÉCURITÉ EN CAS DE JETON EXSPIRÉ (ERREUR 401)
       * Si Laravel répond avec le code '401 Unauthorized' (cela signifie que le jeton a été supprimé
       * côté serveur, ou qu'il a expiré), et que notre front-end croyait encore être connecté :
       * On vide immédiatement le SessionStore pour déconnecter proprement l'utilisateur en front-end.
       */
      if (error.status === 401 && token && session.token() === token) {
        session.clear(); // Efface le token et l'user, ce qui redirigera l'utilisateur (via le Guard)
      }

      // On transmet l'erreur au composant Angular pour qu'il puisse éventuellement afficher un message
      return throwError(() => error);
    }),
  );
};
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { AuthService } from '../services/auth/auth-service'; // Votre service d'authentification
import { SessionStore } from '../session/session.store'; // Notre banque centrale de session

// Définition du Guard sous forme de fonction (Norme moderne d'Angular)
export const authGuard: CanActivateFn = () => {
  // 1. Injection des outils nécessaires
  const session = inject(SessionStore);
  const auth = inject(AuthService);
  const router = inject(Router);

  // 2. Préparation d'une redirection forcée vers la page de Login
  // 'UrlTree' est le format qu'Angular utilise pour effectuer des redirections de routes sécurisées
  const login = router.createUrlTree(['/login']);

  /**
   * ÉTAPE 3 : VÉRIFICATION LOCALE DU JETON (TOKEN)
   * Si la banque centrale (SessionStore) n'a AUCUN token en mémoire, c'est que
   * l'utilisateur n'est pas connecté. On bloque l'accès et on le renvoie directement au login.
   */
  if (!session.token()) return login;

  /**
   * ÉTAPE 4 : VÉRIFICATION DOUBLE SÉCURITÉ AUPRÈS DE LARAVEL (ME)
   * Si un token existe localement, on ne fait pas aveuglément confiance au navigateur.
   * On appelle la méthode 'auth.me()' pour demander à Laravel : "Est-ce que ce jeton est toujours valide ?"
   */
  return auth.me().pipe(
    // Si Laravel valide le jeton et renvoie les infos de l'utilisateur connecté :
    map((user) => {
      // On rafraîchit les données dans notre SessionStore pour être sûr d'avoir le profil à jour
      session.setSession({ token: session.token()!, user });

      // On retourne 'true' : Angular ouvre la porte et affiche la page demandée (le Dashboard Admin)
      return true;
    }),

    // Si Laravel rejette la demande (ex: le serveur est en panne, ou le jeton a expiré) :
    catchError((error) => {
      // Si Laravel répond avec une erreur '401 Unauthorized', on renvoie l'utilisateur vers la page de login.
      // Sinon (ex: coupure réseau), on renvoie 'false' pour bloquer simplement l'accès.
      return of(error.status === 401 ? login : false);
    }),
  );
};
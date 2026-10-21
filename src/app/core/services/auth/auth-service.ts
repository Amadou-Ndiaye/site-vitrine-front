import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { finalize, tap } from 'rxjs';
import { API_BASE } from '../../api/api'; // L'URL racine de votre API Laravel (ex: http://127.0.0)
import { SessionStore } from '../../session/session.store'; // La banque centrale qui garde l'utilisateur en mémoire
import { AuthResponse, Credentials, Registration, User } from '../../models/auth.models'; // Vos interfaces de typage

// Déclare que cette classe est un Service Angular disponible dans toute l'application
@Injectable({ providedIn: 'root' })
export class AuthService {
  // 1. Injection des outils nécessaires
  private http = inject(HttpClient);   // Pour envoyer des requêtes HTTP (POST, GET...) à Laravel
  private session = inject(SessionStore); // Pour enregistrer ou vider l'état de connexion de l'utilisateur

  /**
   * 2. MÉTHODE DE CONNEXION (LOGIN)
   * Elle reçoit l'email et le password du composant de login.
   * Elle appelle la méthode privée "authenticate" en lui spécifiant le chemin '/login'.
   */
  login(data: Credentials) {
    return this.authenticate('/login', data);
  }

  /**
   * 3. MÉTHODE D'INSCRIPTION (REGISTER)
   * Elle reçoit le nom, l'email, le password et sa confirmation depuis le composant d'inscription.
   * Elle appelle la méthode privée "authenticate" en lui spécifiant le chemin '/register'.
   */
  register(data: Registration) {
    return this.authenticate('/register', data);
  }

  /**
   * 4. MÉTHODE PRIVÉE MUTUALISÉE (AUTHENTIFICATE)
   * C'est le "cerveau" du Login et du Register car les deux font presque la même chose.
   * @param path Le chemin de l'API (soit '/login', soit '/register')
   * @param data Les données du formulaire (identifiants ou inscription)
   */
  private authenticate(path: string, data: Credentials | Registration) {
    return this.http
      .post<AuthResponse>(API_BASE + path, data) // Envoie un POST à Laravel (ex: http://.../api/login)
      .pipe(
        // 'tap' est un opérateur RxJS qui permet d'exécuter du code dès que Laravel répond avec succès,
        // sans modifier la réponse HTTP.
        tap((response) => {
          // On prend la réponse de Laravel (qui contient le token et l'user)
          // et on la sauvegarde immédiatement dans le SessionStore.
          this.session.setSession(response);
        })
      );
  }

  /**
   * 5. VÉRIFICATION DU PROFIL (ME)
   * Permet de demander à Laravel : "Qui est connecté actuellement avec ce jeton ?"
   * Utile au démarrage de l'application pour restaurer la session si le jeton existe déjà.
   */
  me() {
    return this.http.get<User>(API_BASE + '/me');
  }

  /**
   * 6. DÉCONNEXION (LOGOUT)
   * Envoie une requête POST vide à Laravel pour lui dire de détruire le jeton côté serveur.
   */
  logout() {
    return this.http
      .post<void>(API_BASE + '/logout', {}) // Demande la déconnexion à Laravel
      .pipe(
        // 'finalize' est un opérateur RxJS très important : il s'exécute QUOI QU'IL ARRIVE
        // (que la requête HTTP réussisse ou qu'elle échoue avec une erreur réseau).
        finalize(() => {
          // Quoi qu'il se passe sur le serveur, on vide obligatoirement la mémoire d'Angular
          // pour déconnecter visuellement l'utilisateur et le rediriger.
          this.session.clear();
        })
      );
  }
}
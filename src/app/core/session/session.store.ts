
import { Injectable, computed, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse, User } from '../models/auth.models';

@Injectable({
  providedIn: 'root'
})
export class SessionStore {

  private platformId = inject(PLATFORM_ID);

  // Vérifier si le code s'exécute dans le navigateur
  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Initialiser le token sans provoquer d'erreur SSR
  private tokenState = signal<string | null>(null);

  private userState = signal<User | null>(null);

  // Signaux accessibles en lecture seule
  readonly token = this.tokenState.asReadonly();
  readonly user = this.userState.asReadonly();

  // Vérifier si un utilisateur est connecté
  readonly isAuthenticated = computed(() => this.user() !== null);

  constructor() {
    // Lire le token uniquement dans le navigateur
    if (this.isBrowser) {
      const savedToken = localStorage.getItem('auth_token');
      this.tokenState.set(savedToken);
    }
  }

  /**
   * Enregistrer la session après une connexion réussie
   */
  setSession(response: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem('auth_token', response.token);
    }

    this.tokenState.set(response.token);
    this.userState.set(response.user);
  }

  /**
   * Supprimer la session lors de la déconnexion
   */
  clear(): void {
    if (this.isBrowser) {
      localStorage.removeItem('auth_token');
    }

    this.tokenState.set(null);
    this.userState.set(null);
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth/auth-service'; // Votre moteur de sécurité

@Component({
  selector: 'app-login',
  standalone: true,
  // ATTENTION ICI : Il faut ajouter ReactiveFormsModule dans les imports pour que le HTML reconnaisse le formulaire !
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})

export class Login {
  // 1. INJECTION DES OUTILS
  private fb = inject(FormBuilder);   // Permet de fabriquer des formulaires HTML facilement
  private auth = inject(AuthService); // Injecte notre service pour envoyer l'email/password à Laravel
  private router = inject(Router);     // Permet de rediriger l'utilisateur vers une autre page

  // 2. GESTION DES ÉTATS DU FORMULAIRE (Signals)
  busy = signal(false);   // Devient 'true' pendant que Laravel vérifie les identifiants (affiche un chargement)
  error = signal('');     // Contient le message d'erreur textuel si la connexion échoue

  // 3. CRÉATION DU FORMULAIRE DE CONNEXION
  // 'nonNullable' empêche les champs de devenir "null" s'ils sont vidés (ils restent des chaînes vides '')
  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]], // Obligatoire + Doit avoir le format d'un email
    password: ['', Validators.required],                  // Obligatoire
  });

  /**
   * 4. DÉCLENCHEMENT AU CLIC SUR LE BOUTON "SE CONNECTER"
   */
  submit() {
    // Sécurité A : Si l'application charge déjà (busy = true), on bloque pour éviter les doubles clics
    if (this.busy()) return;

    // Sécurité B : Si l'utilisateur a mal rempli le formulaire (ex: email invalide)
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Force l'affichage visuel des messages d'erreur sous les champs vides
      return; // On arrête tout ici, la requête ne part pas
    }

    // ÉTAPE C : Préparation du chargement
    this.busy.set(true);  // Active l'état de chargement
    this.error.set('');   // Efface les anciennes erreurs de l'écran

    // ÉTAPE D : Appel à Laravel via l'AuthService
    // 'this.form.getRawValue()' extrait proprement un objet { email: '...', password: '...' }
    this.auth
      .login(this.form.getRawValue())
      .pipe(
        // 'finalize' s'exécute QUOI QU'IL ARRIVE à la fin (succès ou erreur)
        // Il repasse busy à false pour désactiver le chargement et rendre le bouton à nouveau cliquable
        finalize(() => this.busy.set(false))
      )
      .subscribe({
        // Cas 1 : Tout a fonctionné (Laravel a renvoyé le token et l'user)
        // 'void' force la redirection immédiate vers l'espace dasboard admin
        next: () => void this.router.navigateByUrl('/admin/dashboard'),

        // Cas 2 : Laravel a détecté un problème (Mappage intelligent des codes d'erreur HTTP)
        error: (e: HttpErrorResponse) => {
          const message =
            e.status === 401
              ? 'Email ou mot de passe incorrect.' // Mauvais identifiants
              : e.status === 422
                ? 'Vérifiez les champs saisis.'    // Problème de validation Laravel
                : e.status === 429
                  ? 'Trop de tentatives. Patientez.' // Sécurité anti-brute-force de Laravel
                  : 'Connexion impossible. Réessayez.'; // Serveur en panne, coupure internet...

          // On injecte le texte traduit dans notre Signal d'erreur pour l'afficher dans le HTML
          this.error.set(message);
        },
      });
  }
}
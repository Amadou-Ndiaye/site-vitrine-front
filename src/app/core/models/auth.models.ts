export interface User {
  id: number;     // L'identifiant unique de l'utilisateur en base de données
  name: string;   // Le nom ou pseudo de l'utilisateur
  email: string;  // L'adresse email de l'utilisateur
}


export interface Credentials {
  email: string;    // L'email saisi dans le formulaire de login
  password: string; // Le mot de passe saisi dans le formulaire de login
}


export interface Registration extends Credentials {
  name: string;                  // Le nom choisi pour le compte
  password_confirmation: string; // La confirmation du mot de passe (exigée par Laravel)
}


export interface AuthResponse {
  token: string; // Le jeton de sécurité généré par Laravel Sanctum (ou Passport)
  user: User;    // Les données de l'utilisateur connecté (id, name, email)
}
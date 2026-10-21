import { Routes } from '@angular/router';
import { MainLayout } from './layouts/main-layout/main-layout';
import { Home } from './pages/home/home';
import { About } from './pages/sections/about/about';
import { Team } from './pages/sections/team/team';
import { Services } from './pages/sections/services/services';
import { Pricing } from './pages/sections/pricing/pricing';
import { Contact } from './pages/sections/contact/contact';
import { Work } from './pages/sections/work/work';
import { Client } from './pages/sections/client/client';
import { Login } from './pages/login/login';
import { authGuard } from './core/guards/auth-guard';
import { Dashboard } from './admin/dashboard/dashboard';

export const routes: Routes = [

    {
        path: '',
        component: MainLayout,
        children:[

            {
                path: '',
                component: Home
            },
            {
                path: 'about',
                component: About
            },
            {
                path: 'team',
                component: Team
            },
            {
                path: 'services',
                component: Services
            },
            {
                path: 'work',
                component: Work
            },
            {
                path: 'client',
                component: Client
            },
            {
                path: 'pricing',
                component: Pricing
            },
            {
                path: 'contact',
                component: Contact
            }
        ]
    },
    {
        path: 'login',
        component: Login
    },
    // 3. VOTRE VRAI DASHBOARD ADMIN SÉCURISÉ (À placer exactement ici !)
  // Il est indépendant du MainLayout public pour avoir son propre look sombre à la ColorAdmin
  {
    path: 'admin/dashboard',
    component: Dashboard,
    canActivate: [authGuard] // Le guard empêche les intrusions et valide le profil
  },
  // 4. Sécurité anti-page vide (Redirection 404)
  // Si l'utilisateur saisit une URL inconnue, il est automatiquement ramené à la racine (Home)
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

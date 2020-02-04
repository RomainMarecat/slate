import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define which component should be loaded based on the current URL
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profil.module').then(m => m.ProfilModule)
  },
  {
    path: 'profiles',
    loadChildren: () => import('./pages/profile-list/profile-list.module').then(m => m.ProfileListModule)
  },
  {
    path: 'secure',
    loadChildren: () => import('./pages/security/security.module').then(m => m.SecurityModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/my-account/my-account.module').then(m => m.MyAccountModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/cart/cart-edit/cart-edit.module').then(m => m.CartEditModule)
  },
  {
    path: 'sports',
    loadChildren: () => import('./pages/sport-list/sport-list.module').then(m => m.SportListModule)
  },
  {
    path: '404',
    loadChildren: () => import('./pages/page-not-found/pagenotfound.module').then(m => m.PagenotfoundModule)
  },
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}

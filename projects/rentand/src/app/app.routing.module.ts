import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Define which component should be loaded based on the current URL
export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)
  },
  {
    path: 'profils',
    loadChildren: () => import('./pages/profil/profil.module').then(m => m.ProfilModule)
  },
  {
    path: 'secure',
    loadChildren: () => import('./pages/security/security.module').then(m => m.SecurityModule)
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

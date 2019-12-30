import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { PublicGuard } from '../../shared/guard/public.guard';
import { UserGuard } from '../../shared/guard/user.guard';
import { AuthService } from '../../shared/services/auth.service';
import { SecurityComponent } from './security.component';

const securityRoutes: Routes = [
  {
    path: 'login',
    component: SecurityComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Se connecter - rentand',
        description: 'Connexion sur rentand'
      }
    }
  },
  {
    path: 'signup',
    component: SecurityComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'S\'enregister - rentand',
        description: 'Enregistrer un compte sur rentand'
      }
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(securityRoutes),
  ],
  exports: [RouterModule],
  providers: [
    PublicGuard,
    UserGuard,
    AuthService
  ]
})
export class SecurityRoutingModule {
}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { PublicGuard } from '../../shared/guard/public.guard';
import { UserGuard } from '../../shared/guard/user.guard';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { SecurityComponent } from './security.component';

const securityRoutes: Routes = [
  {
    path: 'login',
    component: SecurityComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'Se connecter - laboiteasessions',
        description: 'Connexion sur laboiteasessions'
      }
    }
  },
  {
    path: 'signup',
    component: SecurityComponent,
    canActivate: [MetaGuard],
    data: {
      meta: {
        title: 'S\'enregister - laboiteasessions',
        description: 'Enregistrer un compte sur laboiteasessions'
      }
    }
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(securityRoutes),
  ],
  exports: [RouterModule],
})
export class SecurityRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MetaGuard } from '@ngx-meta/core';
import { AuthService } from '../../shared/services/auth.service';
import { PublicGuard } from '../../shared/guard/public.guard';
import { UserGuard } from '../../shared/guard/user.guard';
import { MyAccountComponent } from './my-account.component';

const myAccountRoutes: Routes = [
  {
    path: 'account',
    component: MyAccountComponent,
    canActivate: [MetaGuard, UserGuard],
    data: {
      meta: {
        override: true,
        title: 'Mon Compte',
        description: 'rentand - Mon Compte'
      }
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(myAccountRoutes),
  ],
  exports: [RouterModule],
  providers: [
    PublicGuard,
    UserGuard,
    AuthService
  ]
})
export class MyAccountRoutingModule {
}

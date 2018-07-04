import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginListComponent } from 'shared/user/login/login-list/login-list.component';
import { Login1Component } from 'shared/user/login/login1/login1.component';
import { Login2Component } from 'shared/user/login/login2/login2.component';

const routes: Routes = [
  {
    path: 'users/logins',
    children: [
      {
        path: '',
        component: LoginListComponent,
      },
      {
        path: 'login1',
        component: Login1Component
      },
      {
        path: 'login2',
        component: Login2Component
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule {
}

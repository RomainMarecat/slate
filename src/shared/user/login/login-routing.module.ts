import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginListComponent } from 'shared/user/login/login-list/login-list.component';
import { Login1Component } from 'shared/user/login/login1/login1.component';

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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from 'shared/user/user-list/user-list.component';

const routes: Routes = [
  {
    path: 'users',
    pathMatch: 'full',
    component: UserListComponent,
    children: [
      {
        path: 'logins',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'registers',
        loadChildren: './register/register.module#RegisterModule'
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}

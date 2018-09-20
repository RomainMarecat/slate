import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from 'shared/user/user-list/user-list.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
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
  imports: [
    RouterModule.forChild(routes),
    LocalizeRouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    LocalizeRouterModule
  ]
})
export class UserRoutingModule {
}

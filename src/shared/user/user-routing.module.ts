import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      breadcrumb: 'breadcrumb.user.title'
    },
    children: [
      {
        path: '',
        component: UserListComponent
      },
      {
        path: 'logins',
        loadChildren: './login/login.module#LoginModule'
      },
      {
        path: 'registers',
        loadChildren: './register/register.module#RegisterModule'
      },
    ]
  }
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

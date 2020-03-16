import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
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
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'registers',
        loadChildren: () => import('./register/register.module').then(m => m.RegisterModule)
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

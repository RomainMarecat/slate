import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { LoginListComponent } from './login-list/login-list.component';
import { Login1Component } from './login1/login1.component';
import { Login2Component } from './login2/login2.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    data: {
      breadcrumb: 'breadcrumb.user.login.title'
    },
    children: [
      {
        path: '',
        component: LoginListComponent,
      },
      {
        path: 'login1',
        component: Login1Component,
        data: {
          breadcrumb: 'breadcrumb.user.login.style-1'
        },
      },
      {
        path: 'login2',
        component: Login2Component,
        data: {
          breadcrumb: 'breadcrumb.user.login.style-2'
        },
      }
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
export class LoginRoutingModule {
}

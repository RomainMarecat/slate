import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';
import { RegisterComponent } from './register/register.component';
import { RegisterListComponent } from './register-list/register-list.component';
import { Register1Component } from './register1/register1.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterComponent,
    data: {
      breadcrumb: 'breadcrumb.user.register.title'
    },
    children: [
      {
        path: '',
        component: RegisterListComponent,
      },
      {
        path: 'register1',
        component: Register1Component,
        data: {
          breadcrumb: 'breadcrumb.user.register.style-1'
        },
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
export class RegisterRoutingModule {
}

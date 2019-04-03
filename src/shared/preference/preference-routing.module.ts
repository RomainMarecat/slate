import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { PreferenceComponent } from './preference/preference.component';
import { PreferenceUserComponent } from './preference-user/preference-user.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceComponent,
    children: [
      {
        path: '',
        component: PreferenceUserComponent,
        data: {
          breadcrumb: 'breadcrumb.preference-user',
        },
      }
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
export class PreferenceRoutingModule {
}

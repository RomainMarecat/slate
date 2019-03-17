import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';
import { PreferenceComponent } from './preference/preference.component';

const routes: Routes = [
  {
    path: '',
    component: PreferenceComponent
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

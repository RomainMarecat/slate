import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [];

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
export class PreparationRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: LayoutBuilderEditComponent,
    data: {
      breadcrumb: 'breadcrumb.layout-builder'
    }
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
export class LayoutBuilderRoutingModule {
}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GprdComponent } from './gprd/gprd.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    component: GprdComponent,
    data: {
      breadcrumb: 'breadcrumb.gprd'
    }
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
export class GprdRoutingModule {
}

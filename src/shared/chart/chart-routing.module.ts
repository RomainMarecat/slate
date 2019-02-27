import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartListComponent } from './chart-list/chart-list.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: ChartListComponent,
    data: {
      breadcrumb: 'breadcrumb.chart'
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
export class ChartRoutingModule {
}

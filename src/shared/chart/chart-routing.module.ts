import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartListComponent } from './chart-list/chart-list.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: '',
    component: ChartListComponent
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

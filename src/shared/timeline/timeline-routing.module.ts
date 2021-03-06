import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { LocalizeRouterModule } from 'localize-router';

const routes: Routes = [
  {
    path: '',
    component: TimelineComponent,
    data: {
      breadcrumb: 'breadcrumb.timeline'
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
export class TimelineRoutingModule {
}

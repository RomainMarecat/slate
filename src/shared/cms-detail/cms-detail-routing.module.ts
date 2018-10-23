import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: ':title',
    pathMatch: 'full',
    component: CmsDetailComponent
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
export class CmsDetailRoutingModule {
}

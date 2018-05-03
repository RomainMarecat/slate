import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsDetailComponent } from './cms-detail/cms-detail.component';

const routes: Routes = [
  {
    path: 'content/:title',
    pathMatch: 'full',
    component: CmsDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsDetailRoutingModule { }

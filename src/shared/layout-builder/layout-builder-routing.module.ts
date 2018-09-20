import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {path: '', component: LayoutBuilderEditComponent},
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

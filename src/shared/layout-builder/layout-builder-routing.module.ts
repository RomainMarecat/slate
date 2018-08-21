import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBuilderEditComponent } from './layout-builder-edit/layout-builder-edit.component';

const routes: Routes = [
  {path: 'layout-builder', component: LayoutBuilderEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutBuilderRoutingModule {
}

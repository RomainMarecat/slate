import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../guard/admin.guard';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [{
    path: '',
    canActivate: [AdminGuard],
    component: SummaryComponent
  },
  {
    path: 'button',
    canActivate: [AdminGuard],
    loadChildren: './button/button.module#ButtonModule'
  },
  {
    path: 'datatable',
    canActivate: [AdminGuard],
    loadChildren: './datatable/datatable.module#DatatableModule'
  },
  {
    path: 'form',
    canActivate: [AdminGuard],
    loadChildren: './form/form.module#FormModule'
  },
  {
    path: 'layout',
    canActivate: [AdminGuard],
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: 'navigation',
    canActivate: [AdminGuard],
    loadChildren: './navigation/navigation.module#NavigationModule'
  },
  {
    path: 'popup',
    canActivate: [AdminGuard],
    loadChildren: './popup/popup.module#PopupModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {}

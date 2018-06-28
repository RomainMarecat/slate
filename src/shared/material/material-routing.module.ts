import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [{
  path: '',
  component: SummaryComponent
},
  {
    path: 'button-indicators',
    loadChildren: './button/button.module#ButtonModule'
  },
  {
    path: 'datatable',
    loadChildren: './datatable/datatable.module#DatatableModule'
  },
  {
    path: 'form',
    loadChildren: './form/form.module#FormModule'
  },
  {
    path: 'layout',
    loadChildren: './layout/layout.module#LayoutModule'
  },
  {
    path: 'navigation',
    loadChildren: './navigation/nav.module#NavModule'
  },
  {
    path: 'popup',
    loadChildren: './popup/popup.module#PopupModule'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule {
}

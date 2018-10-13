import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { TableComponent } from './table/table.component';
import { LocalizeRouterModule } from '@gilsdav/ngx-translate-router';

const routes: Routes = [
  {
    path: 'component/paginator',
    component: PaginatorComponent
  },
  {
    path: 'component/sort-header',
    component: SortHeaderComponent
  },
  {
    path: 'component/table',
    component: TableComponent
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
export class DatatableRoutingModule {
}

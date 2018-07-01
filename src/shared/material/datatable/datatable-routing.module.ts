import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [{
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
  }, ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DatatableRoutingModule {
}

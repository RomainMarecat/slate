import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../../guard/admin.guard';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [ {
  path: 'component/paginator',
  canActivate: [ AdminGuard ],
  component: PaginatorComponent
},
  {
    path: 'component/sort-header',
    canActivate: [ AdminGuard ],
    component: SortHeaderComponent
  },
  {
    path: 'component/table',
    canActivate: [ AdminGuard ],
    component: TableComponent
  }, ];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class DatatableRoutingModule {
}

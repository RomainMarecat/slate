import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { DatatableRoutingModule } from './datatable-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DatatableRoutingModule
  ],
  declarations: [TableComponent, SortHeaderComponent, PaginatorComponent]
})
export class DatatableModule { }

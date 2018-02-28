import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { PaginatorComponent } from './paginator/paginator.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TableComponent, SortHeaderComponent, PaginatorComponent]
})
export class DatatableModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortModule } from './sort/sort.module';
import { FilterModule } from './filter/filter.module';

@NgModule({
  imports: [
    CommonModule,
    FilterModule,
    SortModule
  ],
  exports: [
    FilterModule,
    SortModule
  ]
})
export class FacetModule {}

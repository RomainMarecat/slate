import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './search/search.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }

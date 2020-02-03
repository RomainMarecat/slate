import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportListRoutingModule } from './sport-list-routing.module';
import { SportListComponent } from './sport-list.component';


@NgModule({
  declarations: [SportListComponent],
  imports: [
    CommonModule,
    SportListRoutingModule
  ]
})
export class SportListModule { }

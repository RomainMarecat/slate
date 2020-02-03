import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PagenotfoundRoutingModule } from './pagenotfound-routing.module';
import { PageNotFoundComponent } from './pagenotfound.component';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PagenotfoundRoutingModule
  ]
})
export class PagenotfoundModule {
}

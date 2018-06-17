import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GprdRoutingModule } from './gprd-routing.module';
import { GprdComponent } from './gprd/gprd.component';

@NgModule({
  imports: [
    CommonModule,
    GprdRoutingModule
  ],
  declarations: [GprdComponent]
})
export class GprdModule { }

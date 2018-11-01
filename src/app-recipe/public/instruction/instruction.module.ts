import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InstructionRoutingModule } from './instruction-routing.module';
import { InstructionListComponent } from './instruction-list/instruction-list.component';
import { InstructionDetailComponent } from './instruction-detail/instruction-detail.component';

@NgModule({
  imports: [
    CommonModule,
    InstructionRoutingModule
  ],
  declarations: [InstructionListComponent, InstructionDetailComponent]
})
export class InstructionModule { }
